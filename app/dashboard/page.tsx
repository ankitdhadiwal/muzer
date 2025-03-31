"use client"

import {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {ChevronUp, ChevronDown, Play, Share2} from "lucide-react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { set, z } from "zod";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { YT_REGEX } from "../lib/utlis";
import StreamView from "../components/StreamView";

interface Video {
    "id": string,
    "type": string,
    "url": string,
    "extractedId": string,
    "title": string,
    "smallImg": string,
    "bigImg": string,
    "active": boolean,
    "userId": string,
    "upvotes": number,
    "haveUpvoted": boolean
}

const REFRESH_INTERVAL_MS = 10 * 1000; 

const creatorId = "8bd27e63-d334-4745-83db-e457c8bfa7d8";

export default function Component() {
   
    return <StreamView creatorId={creatorId} playVideo={true} />
}