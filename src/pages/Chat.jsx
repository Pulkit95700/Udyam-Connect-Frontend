import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ChatList from "../components/Chat/ChatList";
import ChatContainer from "../components/Chat/ChatContainer";
import { useParams } from "react-router-dom";
import { privateGetMethod } from "../requests/privateRequests/privateGetMethod";
import {
    doc,
    setDoc,
    query,
    where,
    addDoc,
    getDocs,
    collection,
    updateDoc
} from "firebase/firestore";
import db from "../firebase/config";
import Loading from "../components/ui/Loading";

const Chat = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [receiver, setReceiver] = useState({});
    const [roomId, setRoomId] = useState(null);

    const user = JSON.parse(localStorage.getItem("company"));

    const getReceiverCompanyDetails = useCallback(() => {
        // company details from the backend
        setLoading(true);
        privateGetMethod(`user/company/${id}/`, {}, async (response) => {
            if (response.status >= 200 && response.status < 300) {
                // now set a json for company details
                const receiverUser = {
                    id: response?.data?.data?.id,
                    name: response?.data?.data?.company_name,
                    email: response?.data?.data?.email,
                    isTyping: false,
                };

                const senderUser = {
                    id: user?.id,
                    name: user?.company_name,
                    email: user?.email,
                    isOnline: true,
                    isTyping: false,
                };

                // now set a document with merge equals to true in firebase
                await setDoc(
                    doc(db, "users", receiverUser.email),
                    receiverUser,
                    {
                        merge: true,
                    }
                );

                await setDoc(doc(db, "users", senderUser.email), senderUser, {
                    merge: true,
                });

                // now set a room with the sender and the receiver

                const searchObj = {
                    [senderUser.email]: true,
                    [receiverUser.email]: true,
                };

                // create room only if it does not exist
                const q = query(
                    collection(db, "rooms"),
                    where("participants", "==", searchObj)
                );

                let roomId = null;

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    roomId = doc.id;
                });

                if (!roomId) {
                    const room = {
                        isGroup: false,
                        participants: searchObj,
                        roomName: "",
                    };

                    await addDoc(collection(db, "rooms"), room);
                }

                // after setting the room set the loading to false
                setRoomId(roomId);
                setReceiver(receiverUser);
                setLoading(false);
            } else {
                setLoading(false);
                alert("Something went wrong");
            }
        });
    }, [user?.company_name, user?.email, user?.id, id]);

    const makeUserOffline = useCallback(async () => {
        await updateDoc(doc(db, "users", user.email), {
            isOnline: false,
        });
    }, [user.email]);

    useEffect(() => {
        if (id) {
            getReceiverCompanyDetails();
        }

        window.addEventListener("beforeunload", makeUserOffline);

        return () => {
            window.removeEventListener("beforeunload", makeUserOffline);
        };
    }, [id, makeUserOffline, getReceiverCompanyDetails]);

    return (
        <Layout>
            <div className="flex border border-[#dbdbdb] rounded-lg bg-white h-[calc(100vh-7rem)] mt-[6rem] mx-14 shadow-lg hover:shadow-xl">
                <div className="w-1/4 border-r border-[#dbdbdb]">
                    <ChatList />
                </div>
                <div className="w-3/4">
                    {id ? (
                        loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loading />
                            </div>
                        ) : (
                            <ChatContainer
                                receiver={receiver}
                                roomId={roomId}
                            />
                        )
                    ) : (
                        <p className="text-center mt-14 text-md font-semibold">
                            Please select a chat
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Chat;
