import Message from "../models/message.js";
import User from "../models/user.js";

const removeDeletedUsersMessages = async () => {
	try {
		const messages = await Message.find();
		messages.forEach(async (message) => {
			const fromUser = await User.findById(message.fromUser);
			if (!fromUser) {
				await Message.findByIdAndDelete(message._id);
				console.log(`Message ${message._id} deleted`);
			}
		});
	} catch (err) {
		console.log(err);
	}
};

export default removeDeletedUsersMessages;
