"use client"

import {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {ThumbsUp, ThumbsDown, Play, Share2} from "lucide-react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { set } from "zod";
import axios from "axios";


interface Video {
    id: string;
    title: string;
    upvotes: number;
    downvotes: number;
}

const REFRESH_INTERVAL_MS = 10 * 1000; 

export default function Component() {
    const [inputLink, setInputLink] = useState('')
    const [queue, setQueue] = useState<Video[]>([
        {id: '1', title: 'Awesome Song 1', upvotes: 5, downvotes: 1},
        {id: '2', title: 'Cool Music Video', upvotes: 5, downvotes: 1},
        {id: '3', title: 'Title Hit 2024', upvotes: 5, downvotes: 1},
    ])

    const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

    async function refreshStreams() {
       const res = await axios.get(`/streams/my`)
        console.log(res);
    }

    useEffect(() => {
        refreshStreams();
        const interval = setInterval(() => {

        }, REFRESH_INTERVAL_MS)
    }, [ ])
}