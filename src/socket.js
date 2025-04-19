// socket.js
import { io } from "socket.io-client";

// رابط السيرفر المحلي (تغيره لما يكون عندكم سيرفر جاهز)
const socket = io("http://localhost:5000");

export default socket;
