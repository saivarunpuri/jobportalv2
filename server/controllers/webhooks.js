import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to manage Clerk User with Database
export const clerkWebhooks = async (req, res) => {
    try {
        // Create svix instance for Clerk Webhooks
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        // Getting Data from request body
        const { data, type } = req.body;

        // Switch Cases for different events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: ""
                };
                await User.create(userData);
                res.json({ success: true, message: "User created successfully" });
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
                res.json({ success: true, message: "User updated successfully" });
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({ success: true, message: "User deleted successfully" });
                break;
            }
            default:
                res.json({ success: false, message: "Unhandled event type" });
                break;
        }
    } catch (error) {
        console.error("Webhook Error:", error);
        res.status(500).json({ success: false, message: "Webhook Error" });
    }
};
