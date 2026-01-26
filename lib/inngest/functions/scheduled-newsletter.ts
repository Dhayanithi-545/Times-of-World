import { fetchArticles } from "@/lib/news";
import { inngest } from "../client";
import ai from "@/lib/ai"; // Import the AI client
import { marked } from "marked";
import { sendEmail } from "@/lib/email";
import { createClient } from "@/lib/server";

export default inngest.createFunction(
    { 
        id: "newsletter/scheduled",
        cancelOn: [
            {
                event: "newsletter.paused",
                if: "event.data.userId == async.data.userId"
            }
        ]
    },
    { event: "newsletter.schedule" },
    async ({ event, step, runId }) => {
        try {
            // 0️⃣ Check if user's newsletter is still active
            const isUserActive = await step.run("check-user-status", async () => {
                const supabase = await createClient();
                const { data, error } = await supabase
                    .from("user_preferences")
                    .select("is_active")
                    .eq("user_id", event.data.userId)
                    .single();

                if (error) {
                    console.error("Error checking user status:", error);
                    return false;
                }

                return data?.is_active || false;
            });

            // If user has paused their newsletter, exit early
            if (!isUserActive) {
                console.log(
                    `User ${event.data.userId} has paused their newsletter. Skipping processing.`
                );
                return {
                    skipped: true,
                    reason: "User newsletter is paused",
                    userId: event.data.userId,
                    runId: runId,
                };
            }
        
        // Fetch articles per category
        const categories = event.data.categories;
        const allArticles = await step.run("fetch-news", async () => {
            return fetchArticles(categories);
        })

        // Generate ai summary using OpenAI SDK with Llama backend
        const summary = await step.run("summarize-newsletter", async () => {
            const response = await ai.chat.completions.create({
                model: process.env.OPENAI_MODEL || "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert newsletter editor creating a personalized newsletter.
                        Write a concise, engaging summary that:
                        - Highlights the most important news articles and stories.
                        - Is easy to read and understand.
                        - Provides context and insights
                        - Uses a friendly and conversational tone in simple english
                        - Is well-structured with clear sections
                        - Keeps the reader informed and engaged
                        Format the response as a proper newsletter with a title and organized content.
                        Make it email-friendly with clear sections and engaging subject lines. For best regard name, use the name Dhayanithi`
                    },
                    {
                        role: "user",
                        content: `Create a newsletter summary for these articles from the past week.
                                  categories requested : ${categories.join(", ")}
                                  
                                  Articles:                                        
                                    ${allArticles.map((article: any, idx: number) => 
                                    `${idx + 1}. ${article.title}\n 
                                    ${article.description}\n Source: ${article.url}\n`
                                
                                ).join("\n")}`
                    }
                ]
            });

            return response;
        });

        const newsletterContent = summary.choices[0].message.content;
        console.log(newsletterContent);

        if(!newsletterContent){
            throw new Error("Failed to generate newsletter content");
        }

        // we are getting the response as plain text, we are converting these twxt to html so that emailjs template understands it

        const htmlResult = await marked(newsletterContent);
        
        await step.run("send-email", async () => {
            await sendEmail(
                event.data.email,
                event.data.categories.join(", "),
                allArticles.length,
                htmlResult
            );
        });

        await step.run("schedule-next", async () => {
            const now = new Date()
            let nextScheduleTime : Date;

            switch (event.data.frequency) {
                case "daily":
                    nextScheduleTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    break;
                case "weekly":
                    nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                case "biweekly":
                    nextScheduleTime = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            }

      
            nextScheduleTime.setHours(9, 0, 0, 0);
      
            await inngest.send({
                name: "newsletter.schedule",
                data: {
                    categories,
                    email : event.data.email,
                    frequency : event.data.frequency,
                    userId: event.data.userId
                },
                ts: nextScheduleTime.getTime(),
            });
      
        });

        return {
            success: true,
            userId: event.data.userId,
            runId: runId,
            articleCount: allArticles.length,
            nextScheduled: true
        };
    } catch (error) {
        console.error("Newsletter processing error:", error);
        throw error;
    }
});