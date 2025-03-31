// import { prismaClient } from "@/app/lib/db";
// import { getServerSession } from "next-auth";
// import { NextResponse, NextRequest } from "next/server";

// export async function GET() {
//     const session = await getServerSession();

//     const user = await prismaClient.user.findFirst({
//         where: {
//             email: session?.user?.email ?? ""
//         }
//     });

//     if(!user) {
//         return NextResponse.json({
//             message: "Unauthenticated"
//         }, {
//             status: 403
//         })
//     }

//     const mostUpvotedStream = await prismaClient.stream.findFirst({
//         where: {
//             userId: user.id
//         },
//         orderBy: {
//             upvotes: {
//                 _count: 'desc'
//             }
//         }
//     });

//     if(!mostUpvotedStream) {
//         return NextResponse.json({
//             message: "No stream found to update or delete"
//         }, {
//             status: 403
//         }); 
//     }

//     await Promise.all([prismaClient.currentStream.upsert({
//         where: {
//             userId: user.id
//         },
//         update: {
//             streamId: mostUpvotedStream?.id 
//         },
//         create: {
//             userId: user.id,
//             streamId: mostUpvotedStream?.id
//         }
//     })])

//     const streamExists = await prismaClient.stream.findUnique({
//         where: {
//             id: mostUpvotedStream.id
//         }
//     });

//     if (streamExists) {
//         await prismaClient.stream.delete({
//             where: {
//                 id: mostUpvotedStream.id
//             }
//         });
//     }

//     return NextResponse.json({
//         stream: mostUpvotedStream
//     });

// }


// export async function GET() {
//     const session = await getServerSession();

//     const user = await prismaClient.user.findFirst({
//         where: {
//             email: session?.user?.email ?? ""
//         }
//     });

//     if (!user) {
//         return NextResponse.json({
//             message: "Unauthenticated"
//         }, {
//             status: 403
//         });
//     }

//     console.log("User ID:", user.id);

//     const mostUpvotedStream = await prismaClient.stream.findFirst({
//         where: {
//             userId: user.id
//         },
//         orderBy: {
//             upvotes: {
//                 _count: 'desc'
//             }
//         }
//     });

//     if (!mostUpvotedStream) {
//         // No streams exist, but ensure currentStream entry is updated
//         await prismaClient.currentStream.upsert({
//             where: { userId: user.id },
//             update: { streamId: null },
//             create: { userId: user.id, streamId: null }
//         });

//         return NextResponse.json({
//             message: "No stream found to update or delete."
//         }, {
//             status: 200  // Change to 200 instead of 403
//         });
//     }

//     // Update current stream
//     await prismaClient.currentStream.upsert({
//         where: { userId: user.id },
//         update: { streamId: mostUpvotedStream.id },
//         create: { userId: user.id, streamId: mostUpvotedStream.id }
//     });

//     // Ensure the stream exists before deleting
//     const streamExists = await prismaClient.stream.findUnique({
//         where: { id: mostUpvotedStream.id }
//     });

//     if (streamExists) {
//         await prismaClient.stream.delete({
//             where: { id: mostUpvotedStream.id }
//         });
//     }

//     return NextResponse.json({
//         stream: mostUpvotedStream
//     });
// }


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prismaClient } from "@/app/lib/db";


export async function GET() {
    const session = await getServerSession();

    if (!session?.user?.email) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, { status: 403 });
    }

    const user = await prismaClient.user.findFirst({
        where: { email: session.user.email }
    });

    if (!user) {
        return NextResponse.json({
            message: "User not found"
        }, { status: 404 });
    }

    console.log("User ID:", user.id);

    // Find the most upvoted stream
    const mostUpvotedStream = await prismaClient.stream.findFirst({
        where: { userId: user.id },
        orderBy: { upvotes: { _count: 'desc' } }
    });

    if (!mostUpvotedStream) {
        // No stream exists, but ensure currentStream is set to null
        await prismaClient.currentStream.upsert({
            where: { userId: user.id },
            update: { streamId: null },
            create: { userId: user.id, streamId: null }
        });

        return NextResponse.json({
            message: "No stream found to update or delete."
        }, { status: 200 });
    }

    // Ensure the currentStream is updated before deletion
    await prismaClient.currentStream.upsert({
        where: { userId: user.id },
        update: { streamId: mostUpvotedStream.id },
        create: { userId: user.id, streamId: mostUpvotedStream.id }
    });

    // Check if the stream exists before attempting deletion
    const streamExists = await prismaClient.stream.findUnique({
        where: { id: mostUpvotedStream.id }
    });

    if (streamExists) {
        try {
            // Delete related Upvotes first if cascade isn't working
            await prismaClient.upvote.deleteMany({
                where: { streamId: mostUpvotedStream.id }
            });

            // Delete the stream
            await prismaClient.stream.delete({
                where: { id: mostUpvotedStream.id }
            });

            console.log("Deleted stream:", mostUpvotedStream.id);
        } catch (error) {
            console.error("Error deleting stream:", error);
            return NextResponse.json({
                message: "Error deleting stream",
            }, { status: 500 });
        }
    }

    return NextResponse.json({
        message: "Stream updated and deleted successfully",
        stream: mostUpvotedStream
    });
}
