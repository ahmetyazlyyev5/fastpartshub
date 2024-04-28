"use client";
import PartModel from "@/components/PartModel";
import PartVariationSection from "@/components/PartVariationSection/PartVariationSection";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Page() {
    const q = useSearchParams();
    const query = q.get("query");
    const router = useRouter();
    const modalOpenRef = useRef();

    const [modalData, setModalData] = useState(null);
    const [modalSuccessFn, setModalSuccessFn] = useState(null);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchParts = async () => {
        try {
            const res = await axios.get(`/api/list-parts/?query=${query}`, {
                baseURL: "http://127.0.0.1:8000",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            console.log("RESPONSE CAME", res);
            return res;
        } catch (error) {
            console.log("ERROR", error);
            return error.response;
        }
    };

    useEffect(() => {
        if (query) {
            // setData([
            //     {
            //         name: "Front Bumper",
            //         variations: [
            //             {
            //                 title: "Primed",
            //                 minPrice: 300,
            //                 maxPrice: 700,
            //                 description:
            //                     "Mercedes Benz C300 2013 front bumper, primed finish",
            //                 image: "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 id: 1,
            //                 images: [
            //                     "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 ],
            //             },
            //             {
            //                 title: "Painted",
            //                 minPrice: 500,
            //                 maxPrice: 1000,
            //                 description:
            //                     "Mercedes Benz C300 2013 front bumper, painted finish",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                 id: 2,
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.YcghBatLtt7zt6O7QAReSQHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.J4ROHHzlz2awaDRTAW4PdQHaE9&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.FAfuUGlTPLQJ0LemTyR9uAHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.agBXNphtd3kpxHvSdEeGGgHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.fmNB4r2d1T7ffA4bfr_BkgHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.ZmAXXFx8FbGR74LfaAH3WgHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "front_bumper",
            //     },
            //     {
            //         name: "Rear Bumper",
            //         variations: [
            //             {
            //                 title: "Primed",
            //                 minPrice: 300,
            //                 maxPrice: 700,
            //                 description:
            //                     "Mercedes Benz C300 2013 rear bumper, primed finish",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                 id: 3,
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.B4ILqtIF3Vz0eGIrskRz9QHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.gyYesLJ_NucdVXZbQrLCVQHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.InFKD8ypaoVXVc-JZ65IjAHaE9&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.rS4xYLuPd_OEfQd--2DZaAHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.NmjTMCd1bfHKWRKP0fBYdgHaEo&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Painted",
            //                 minPrice: 500,
            //                 maxPrice: 1000,
            //                 description:
            //                     "Mercedes Benz C300 2013 rear bumper, painted finish",
            //                 image: "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 id: 4,
            //                 images: [
            //                     "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 ],
            //             },
            //         ],
            //         key: "rear_bumper",
            //     },
            //     {
            //         name: "Side Mirror",
            //         variations: [
            //             {
            //                 title: "Left Side",
            //                 minPrice: 200,
            //                 maxPrice: 400,
            //                 description:
            //                     "Mercedes Benz C300 2013 side mirror, left side",
            //                 image: "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 id: 5,
            //                 images: [
            //                     "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 ],
            //             },
            //             {
            //                 title: "Right Side",
            //                 minPrice: 200,
            //                 maxPrice: 400,
            //                 description:
            //                     "Mercedes Benz C300 2013 side mirror, right side",
            //                 image: "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 id: 6,
            //                 images: [
            //                     "https://static.vecteezy.com/system/resources/thumbnails/008/255/803/small/page-not-found-error-404-system-updates-uploading-computing-operation-installation-programs-system-maintenance-a-hand-drawn-layout-template-of-a-broken-robot-illustration-vector.jpg",
            //                 ],
            //             },
            //         ],
            //         key: "side_mirror",
            //     },
            //     {
            //         name: "Door Handle",
            //         variations: [
            //             {
            //                 title: "Front Driver Side",
            //                 minPrice: 50,
            //                 maxPrice: 150,
            //                 description:
            //                     "Mercedes Benz C300 2013 front driver side door handle",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.4MzeTSmNvQVRBaptRl5djQHaFj&pid=Api",
            //                 id: 7,
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.4MzeTSmNvQVRBaptRl5djQHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.-ZvD8dok_Eyio0ErnUZc6wHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.1TiSLRNvYVp-_Dc36kQvKQHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.R0LZ79YrEhyAGPFh1WwBNgEsDh&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.qFSnB550gq9C-v7BYyoC8AHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RM4bBhmoAiTyhP3J8GRLrgHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.FAfuUGlTPLQJ0LemTyR9uAHaE8&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.Je5OOe4VXSfDFEgXxJk-iAHaEK&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Front Passenger Side",
            //                 minPrice: 50,
            //                 maxPrice: 150,
            //                 description:
            //                     "Mercedes Benz C300 2013 front passenger side door handle",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.R0LZ79YrEhyAGPFh1WwBNgEsDh&pid=Api",
            //                 id: 8,
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.R0LZ79YrEhyAGPFh1WwBNgEsDh&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.-ZvD8dok_Eyio0ErnUZc6wHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.-rtcfnqaRukuqSPTgCSm9QHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.dzyJj39OfSUvBdn2hA9A6AHaE4&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.FAfuUGlTPLQJ0LemTyR9uAHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.pO-SKK_XS2y5s3Q8w4NoJwHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OaKR_Ynzo3GmGMRRt0k0OgHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "door_handle",
            //     },
            //     {
            //         name: "Wheel Set",
            //         variations: [
            //             {
            //                 title: "18-inch Alloy",
            //                 minPrice: 1000,
            //                 maxPrice: 2000,
            //                 description:
            //                     "Mercedes Benz C300 2013 18-inch alloy wheel set, used",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.p1WW_-xA8hIVbqa7dGH6AAHaHa&pid=Api",
            //                 id: 9,
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.p1WW_-xA8hIVbqa7dGH6AAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.cKCbpUxg5u3rIQC6MPflNwHaI0&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.MFr7M08oVH_M0ymKFneIlQHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.FpRi9VmS2S6E2AJdiH8LqAHaHP&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.nBuY08stJ65ssH2HkcvAhgHaGs&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.RE3FaHUA1V3ibfL4Vf12yAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.DbTjUpmNReLUuF0S8Zym6AHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.KH-ahNbTedVhu_QHjGhZkgHaHP&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.SNUndXiOZrFZTPX0MOKhkAHaHf&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP._a2kmMr23JQgt6TRhqpSzQHaE8&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "19-inch AMG",
            //                 minPrice: 1500,
            //                 maxPrice: 2500,
            //                 description:
            //                     "Mercedes Benz C300 2013 19-inch AMG wheel set, used",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.JjyspqX66xwV8d6fo9Cl2wHaE8&pid=Api",
            //                 id: 10,
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.JjyspqX66xwV8d6fo9Cl2wHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.QOZwZ8qSgy8qRmq0OBBFtAHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OaKR_Ynzo3GmGMRRt0k0OgHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.iiwIkba0N3QQlsYFd6cORgHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.VMkQl2v-tK9eAYjkAW06DgHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.RaAoAUi7mPUD20a44rGQ5wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.taBA7H7TS-sv6_JfPEQlRAHaEK&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "wheel_set",
            //     },
            //     {
            //         name: "Dashboard",
            //         variations: [
            //             {
            //                 title: "Black Dashboard",
            //                 minPrice: 500,
            //                 maxPrice: 1500,
            //                 id: 1,
            //                 description:
            //                     "Mercedes benz c300 2013 black dashboard trim, good condition",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.emhp3FiTNNBKDEoRPna3WAHaFj&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.emhp3FiTNNBKDEoRPna3WAHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.aFVRVJpA0r6A0gD9y5nZiwHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RPnFqTxPKP8SHY1-XHR9agHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.dluvFg1r3pjmVlonICo6jwHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.PQ5kk9o4nAuigwRVhXuy7wHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.AftNeBq6u0gSB1H4A4lHXAHaEh&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.kL3SvjpZVj4axQY4iKfmlAHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.L1Ilt5qi6fwV-DysRjEX7QHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.JmpuRgiyGFp-V-WWO8LYugHaE8&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Woodgrain Dashboard",
            //                 minPrice: 800,
            //                 maxPrice: 2000,
            //                 id: 2,
            //                 description:
            //                     "Mercedes benz c300 2013 woodgrain dashboard trim, excellent condition",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.ZwC4eYqKaagvTWxbPiXfzwHaHa&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.ZwC4eYqKaagvTWxbPiXfzwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.oW0DuEAtdWJ7CEcQbJddhgHaCH&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.4h07ogJi7vxAQQmBs73ArAHaDf&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.UsghpPG-6QkiQtvzY5XJbAAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.emhp3FiTNNBKDEoRPna3WAHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RPnFqTxPKP8SHY1-XHR9agHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.PQ5kk9o4nAuigwRVhXuy7wHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.dluvFg1r3pjmVlonICo6jwHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.tA5RiTqpJKY163UlIMSVygAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.kL3SvjpZVj4axQY4iKfmlAHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "dashboard",
            //     },
            //     {
            //         name: "Center Console",
            //         variations: [
            //             {
            //                 title: "Silver Center Console",
            //                 minPrice: 300,
            //                 maxPrice: 1000,
            //                 id: 1,
            //                 description:
            //                     "Mercedes benz c300 2013 silver center console trim, like new",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.f3fwIgfQhp52TyNXDCLPjAHaFj&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.f3fwIgfQhp52TyNXDCLPjAHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.uwUWfbJ3306iAK0K8yWN8wHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.aPqT67fJtwd02n1SumzOjgHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RPnFqTxPKP8SHY1-XHR9agHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.wM02i7yz2mXuj3Rj8M2PywHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.Cv8dpgZhXaKc4v0KyTb5TQHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.emhp3FiTNNBKDEoRPna3WAHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.wlAlW6Aknmnfk2c-KOycEAHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Carbon Fiber Center Console",
            //                 minPrice: 400,
            //                 maxPrice: 1200,
            //                 id: 2,
            //                 description:
            //                     "Mercedes benz c300 2013 carbon fiber center console trim, very good condition",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.3pHP-XEPNLC4N4FZe7PYpQHaHa&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.3pHP-XEPNLC4N4FZe7PYpQHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.ER0__idmqLAxj8awpYfXCgHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.iTCFGbwXXPL5Nbw-TOLcxQHaFL&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.q5JLJ4aTErDK-m-tQnS9MAHaJO&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.7y9AmtP2SYRHDA2oi_vPJgHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.qLRXmsUwgohNZVPnT0Gf9gHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.9eBFhxa9rU2zSldUgGP8nQHaFL&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.a8XN9KXhXhp1Wt5e3aluLQHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.8uPfDkjlLgPX3UVEk23e8QHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.BJtN1UwDA95eA-oXEQf-HgHaQd&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "center_console",
            //     },
            //     {
            //         name: "Door Panels",
            //         variations: [
            //             {
            //                 title: "Black Leather Door Panels - Front Left",
            //                 minPrice: 200,
            //                 maxPrice: 800,
            //                 id: 1,
            //                 description:
            //                     "Mercedes benz c300 2013 black leather door panel for front left, used condition",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RPnFqTxPKP8SHY1-XHR9agHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.emhp3FiTNNBKDEoRPna3WAHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.L1Ilt5qi6fwV-DysRjEX7QHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.LPvT0WEV9z_n20p_MQuHIwHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Black Leather Door Panels - Rear Left",
            //                 minPrice: 180,
            //                 maxPrice: 700,
            //                 id: 2,
            //                 description:
            //                     "Mercedes benz c300 2013 black leather door panel for rear left, good condition",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.otBk7S3073VzAByJhfNl9wHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.NmjTMCd1bfHKWRKP0fBYdgHaEo&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.wBScbFo18CVaPtJj-b4qxgHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OaKR_Ynzo3GmGMRRt0k0OgHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.L1Ilt5qi6fwV-DysRjEX7QHaFj&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Black Leather Door Panels - Rear Right",
            //                 minPrice: 200,
            //                 maxPrice: 800,
            //                 id: 3,
            //                 description:
            //                     "Mercedes benz c300 2013 black leather door panel for rear right, used condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.ZbQzSamNd0RlFIuZEhhuJQHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.NmjTMCd1bfHKWRKP0fBYdgHaEo&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.L1Ilt5qi6fwV-DysRjEX7QHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "door_panels",
            //     },
            //     {
            //         name: "Front Bumper",
            //         variations: [
            //             {
            //                 title: "Black Front Bumper",
            //                 minPrice: 500,
            //                 maxPrice: 800,
            //                 id: 1,
            //                 description:
            //                     "Mercedes Benz C300 2013 front bumper in black color, new condition",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.YVBcIfrbAoeYV8IfuZrbjQHaHa&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.YVBcIfrbAoeYV8IfuZrbjQHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.vfI72cEQXfCtTWYnLYY0iwAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.lgodV5rxTSPp6cfqeRR6UwHaFF&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.mznmDPgpvLh0uM251mUYqwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.-Ui2ldlvVw59iMxRYMjJWwHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.z7N_9vAIMLIRcSmawNcofQHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.-hx2rew0SyNxewOLgirAUAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.tqFv9yTv8BL7thC_L7XeUQHaE8&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.wGnIvJPweG0VSCDXCVcNagHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.BSOvnwRN3asBrgoew7_6gwHaE8&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Silver Front Bumper",
            //                 minPrice: 550,
            //                 maxPrice: 850,
            //                 id: 2,
            //                 description:
            //                     "Mercedes Benz C300 2013 front bumper in silver color, new condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.LfkupyBth2s-XcJQ1FiB7wHaHa&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.LfkupyBth2s-XcJQ1FiB7wHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.fVUJivzy3pahMyZUhTRFSAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.1cC_Y-9K76VSLgc6dLw8KgHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.z7N_9vAIMLIRcSmawNcofQHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.deO9haWOH4hGK4BHtNaUeQHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.hWvhfQo9P8Q0t3rRfMjJdgHaEJ&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.tqFv9yTv8BL7thC_L7XeUQHaE8&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.-hx2rew0SyNxewOLgirAUAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.mznmDPgpvLh0uM251mUYqwHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.o9LyLooIpvwwrGme3gZzEgHaE8&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "front_bumper",
            //     },
            //     {
            //         name: "Rear Bumper",
            //         variations: [
            //             {
            //                 title: "Black Rear Bumper",
            //                 minPrice: 450,
            //                 maxPrice: 750,
            //                 id: 1,
            //                 description:
            //                     "Mercedes Benz C300 2013 rear bumper in black color, new condition",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.mznmDPgpvLh0uM251mUYqwHaHa&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.mznmDPgpvLh0uM251mUYqwHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.adLACh8JY3uI5LoW_bxNFAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.B7Y79fAl5fAqYd5qwigcvQHaF5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.Xvyr5vK5tLc1zKi8uBPjggHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.SpAlqF-PWBwTtDmDu1mr_QHaF7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.k9SWr2vVUmKu298uH-GPpgHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.GQK9QAuW4L3u7DCxrVSYewHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.pu3XMk1komvdvnLk0zcJnQAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.s9q_-1CPFZSbBaGfHkVrgwHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.ryo_1QllmaLKZU5X5CfrngHaEJ&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Silver Rear Bumper",
            //                 minPrice: 500,
            //                 maxPrice: 800,
            //                 id: 2,
            //                 description:
            //                     "Mercedes Benz C300 2013 rear bumper in silver color, new condition",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.mznmDPgpvLh0uM251mUYqwHaHa&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.mznmDPgpvLh0uM251mUYqwHaHa&pid=Api",
            //                     "https://tse4.explicit.bing.net/th?id=OIP.fEy9xy51xFdVBHNcjxJXwQHaEJ&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.B7Y79fAl5fAqYd5qwigcvQHaF5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.KvtEhCEwUIujFbB4CihaHAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.k9SWr2vVUmKu298uH-GPpgHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.adLACh8JY3uI5LoW_bxNFAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.SpAlqF-PWBwTtDmDu1mr_QHaF7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.ryo_1QllmaLKZU5X5CfrngHaEJ&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.pu3XMk1komvdvnLk0zcJnQAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.a8XN9KXhXhp1Wt5e3aluLQHaHa&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "rear_bumper",
            //     },
            //     {
            //         name: "Front Left Door",
            //         variations: [
            //             {
            //                 title: "Front Left Door",
            //                 minPrice: 800,
            //                 maxPrice: 1200,
            //                 id: 1,
            //                 description:
            //                     "Mercedes Benz C300 2013 front left door, used condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.mn8QtfWHAZoK3fsi4CbV0wHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.SKw_Tb9wbYCEnoQVCFOSVQHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "front_left_door",
            //     },
            //     {
            //         name: "Front Right Door",
            //         variations: [
            //             {
            //                 title: "Front Right Door",
            //                 minPrice: 800,
            //                 maxPrice: 1200,
            //                 id: 1,
            //                 description:
            //                     "Mercedes Benz C300 2013 front right door, used condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.SKw_Tb9wbYCEnoQVCFOSVQHaE8&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.pO-SKK_XS2y5s3Q8w4NoJwHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.agBXNphtd3kpxHvSdEeGGgHaE5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.qtLvBlPpOF0jaksko173VAHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "front_right_door",
            //     },
            //     {
            //         name: "Rear Left Door",
            //         variations: [
            //             {
            //                 title: "Rear Left Door",
            //                 minPrice: 800,
            //                 maxPrice: 1200,
            //                 id: 1,
            //                 description:
            //                     "Mercedes Benz C300 2013 rear left door, used condition",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.8Y5RG7m7yPz7gJiOsUwY4wHaEK&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.8Y5RG7m7yPz7gJiOsUwY4wHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.SKw_Tb9wbYCEnoQVCFOSVQHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.qtLvBlPpOF0jaksko173VAHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "rear_left_door",
            //     },
            //     {
            //         name: "Rear Right Door",
            //         variations: [
            //             {
            //                 title: "Rear Right Door",
            //                 minPrice: 800,
            //                 maxPrice: 1200,
            //                 id: 1,
            //                 description:
            //                     "Mercedes Benz C300 2013 rear right door, used condition",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.8Y5RG7m7yPz7gJiOsUwY4wHaEK&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.8Y5RG7m7yPz7gJiOsUwY4wHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.wBScbFo18CVaPtJj-b4qxgHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.QByx_QDeGFwrP8mjNhdphwHaEo&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.SKw_Tb9wbYCEnoQVCFOSVQHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "rear_right_door",
            //     },
            //     {
            //         name: "Hood",
            //         variations: [
            //             {
            //                 title: "Hood",
            //                 minPrice: 700,
            //                 maxPrice: 1000,
            //                 id: 1,
            //                 description:
            //                     "Mercedes Benz C300 2013 hood, new condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.otXmqy1NL9p-naqL4s66yAHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.H1Ap5hTADWTyqTXS0Q7-OgHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.c9zQvcgg9-SMjQZDWnlAMwAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.7OfcQDoj3kERQxVyNYgvcAHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.vhOFU732M5zNl371QFUrCQHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.668QV0spJuGBZbGna51T_QHaEJ&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.Df8XpU2rsdAisXVu3D0FiwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.TbF4mA9Um-b75dMMg7I3gAHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.eEHS8Q1w0YqWhnWBFB_jhQHaE8&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "hood",
            //     },
            //     {
            //         name: "Engine",
            //         variations: [
            //             {
            //                 title: "Complete Engine Assembly",
            //                 minPrice: 8000,
            //                 maxPrice: 15000,
            //                 id: 1,
            //                 description:
            //                     "Mercedes benz c300 2013 complete engine assembly, remanufactured",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.Gm0Hs8dapmC5kcdCtwenJAHaFF&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.Gm0Hs8dapmC5kcdCtwenJAHaFF&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.Y7A10exvhOwgYb2nZGSzLwHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.jl412-MJeeZBwEXqXrqo2wHaD7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.Tvv9m2LG-068DzHgGqxXywHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.xL144yFpm8MaVh-u1L2AfwAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.AOe8TmSp6CCokiVucHSKPwHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.7oUczDVZUPkAV1ElmqgzjQHaEh&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.BrwzA70rdz1xDrhupex_vwHaE8&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.8wssmuSVXV4u5JjSt4LSBgHaFW&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Engine Block",
            //                 minPrice: 1500,
            //                 maxPrice: 3000,
            //                 id: 2,
            //                 description:
            //                     "Mercedes benz c300 2013 engine block, new",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.Gm0Hs8dapmC5kcdCtwenJAHaFF&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.Gm0Hs8dapmC5kcdCtwenJAHaFF&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.Uzlt4J73QPUqzpTt2WWmtAHaFY&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.-WCb6RUtY0Bd99ionYLBggHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.jl412-MJeeZBwEXqXrqo2wHaD7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.Vr9Rbo3bCCxzCUbCicD0dAHaEW&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.DBOs7HEUzQc9BdoksvCyEwHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.AOe8TmSp6CCokiVucHSKPwHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.yQ8u4pATHuVTy_0DnWSqwAHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.c2S2wBzQ9cOtJ4T52fxTHQHaEb&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Cylinder Head",
            //                 minPrice: 1200,
            //                 maxPrice: 2500,
            //                 id: 3,
            //                 description:
            //                     "Mercedes benz c300 2013 cylinder head, rebuilt",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.MgE8jzyx_KmERrp8NmXgRwAAAA&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.MgE8jzyx_KmERrp8NmXgRwAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.yVu9sUIx_63wO0isRz5TgAHaE8&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.M6K76V0STfeFAeFkhB5eAQHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.CcT_bq7hQpz-Wi63FLHkOwHaEl&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.UiSanQf90LJGvzSLQwlOSgAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.4ak_9rpRWrYGZ7RnT2mk8gAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.rzPwdK463hOytdk8juDIXQHaD1&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.qWTZkldLVNrKt7wE5zpHwwAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.RqE7jTkrAm7rWYK57yRdogAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.YBxU40rngyauSj0AgL7wpQAAAA&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Pistons Set",
            //                 minPrice: 400,
            //                 maxPrice: 800,
            //                 id: 4,
            //                 description:
            //                     "Mercedes benz c300 2013 pistons set, OEM",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.enlZOuHoaDXVqeSWEEoRwQHaHa&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.enlZOuHoaDXVqeSWEEoRwQHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.c6ICeQXasJdMhTC9uEOaBQHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.DsHOTZZ5eRb8iesPSq17kAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.wlaFUSNhVz1INc85dJXtSAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.iHCh5UdaasdVdq7rT6jJbwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.3MkIQox9iEjv0Cw5qdPweQHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.oI8B5_HpFoMVTqZaoaLZxwHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.Mg2nMMHmDIfkoNcWKvHgxQHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.qcmG7ZJObjbFPL_zIrfe1QHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.BRjxyByhEBOoV1huDnElJwHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Crankshaft",
            //                 minPrice: 800,
            //                 maxPrice: 1500,
            //                 id: 5,
            //                 description:
            //                     "Mercedes benz c300 2013 crankshaft, refurbished",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.XJq4CR-txFAe1veNIfcHmAHaEr&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.XJq4CR-txFAe1veNIfcHmAHaEr&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.KO5Y6UPeKgNKxwQQJt4M0QHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.YodyZ-LbWUzMZ93I1TjW1gHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.NjP6OD2b7p-9urh_460E3AHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.wmG6lJU2RlYFXERSP3ZH0AHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.PIjsFpxuvVocgiwlty8wFQHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.qOZKBIXSl5Zz1kmmXumipQHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.feWCjPYM7ZYaDTy6ZZvOvQHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.cMPPLnq5Ov4RDu9Itun4XgHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.7p11Rik4EGrtaNtnIrBaHwHaFR&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Camshaft",
            //                 minPrice: 300,
            //                 maxPrice: 600,
            //                 id: 6,
            //                 description:
            //                     "Mercedes benz c300 2013 camshaft, used",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.a_SDuHUcFOZiuf-VbF7etQHaF-&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.a_SDuHUcFOZiuf-VbF7etQHaF-&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.ZtjuFdut2bSYlA-1wkwraAHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.KO5Y6UPeKgNKxwQQJt4M0QHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.5478IZasxP36nzM76Gc0jgHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.b3HSc9Wyu0W3plj4AKaZJAHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.ydNVx3knU2jLihvaFIG4sQHaE2&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.1audyGLvyvGMnY1dtsxkjAHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.2p78jlS47sU7lx6Lw8NkDAHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.7p11Rik4EGrtaNtnIrBaHwHaFR&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.S6ooBocClFlZwYNXe-KwAQHaFj&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Timing Chain Kit",
            //                 minPrice: 200,
            //                 maxPrice: 400,
            //                 id: 7,
            //                 description:
            //                     "Mercedes benz c300 2013 timing chain kit, aftermarket",
            //                 image: "https://tse3.explicit.bing.net/th?id=OIP.b3HSc9Wyu0W3plj4AKaZJAHaEK&pid=Api",
            //                 images: [
            //                     "https://tse3.explicit.bing.net/th?id=OIP.b3HSc9Wyu0W3plj4AKaZJAHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.6IlUV8OyS81Kt7B4vbMxigHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.1PkFTldNMI8sJJeOJ9qyWwHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.3LVBSRsk_-rFoW_SpsMcbQHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP._m2mgguL-B7lq9TXb90gZAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.Ck4ZqTfSC2-I4A_r4qXOYQHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.7g-92v_WEQLwFJ5pUVh7WAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.cP67AIRbUsesr6K4rna-_QHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.uRJUwP7dC2MRXNKTzs1kqgHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.LXTP7nTNigt959B4RmOIBgHaJa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Oil Pump",
            //                 minPrice: 150,
            //                 maxPrice: 300,
            //                 id: 8,
            //                 description:
            //                     "Mercedes benz c300 2013 oil pump, genuine",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.Z9Zq-k-lNlqtwkO8hxIcJAHaEK&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.Z9Zq-k-lNlqtwkO8hxIcJAHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.jc8odZkkK0JbOS1EAu2hIQHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.3GCxd-XOmUAMM_zFMIQ-fwHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.1i8M3LkH3TqYe3CgDbvaRAHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.ChsLyC6IkKvAh_QN10yOGAHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.jh-DGd-vTtD5cYdUHXOg4AHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.bmTiemz1E2mWt9An4veeCAHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.BccH8YAm5WJMPxxrT1s0EgHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.XTgkB4JizYRS-WPjj6oj4QHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.5478IZasxP36nzM76Gc0jgHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Gaskets Set",
            //                 minPrice: 100,
            //                 maxPrice: 200,
            //                 id: 9,
            //                 description:
            //                     "Mercedes benz c300 2013 gaskets set, high quality",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.wfwv7xbIMedzdsuEntVDIwAAAA&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.wfwv7xbIMedzdsuEntVDIwAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.cgHRCHibQ0D7lbmFY3DOCwHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.YbwThoSWvz3h-2EB_vvgygHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.GSCvYHRsB7QI-0z3cxE_fwAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.eXAqAsb6YTAwg5tm9nAx4wAAAA&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.VFg5z8KrFMkijYxQAiI0jwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.SuSVKwOPGAGgLeIL86yqKgAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.CVnosL2XdgmRbl7Qk0nmgwHaGC&pid=Api",
            //                     "https://tse3.explicit.bing.net/th?id=OIP.58AS0eNbx6KYbLDMPDfHSgHaGA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.519nT0zfngTDUXXWQRTI8gHaF8&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "engine",
            //     },
            //     {
            //         name: "Suspension Strut Assembly",
            //         variations: [
            //             {
            //                 title: "Front Left Suspension Strut Assembly",
            //                 minPrice: 200,
            //                 maxPrice: 500,
            //                 description:
            //                     "OEM Front Left Suspension Strut Assembly for Mercedes Benz C300 2013",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.3jc9XIDNfN7AqQJX4s-XGQHaGN&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.3jc9XIDNfN7AqQJX4s-XGQHaGN&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.KcNRd-0O44TBJUhfNmhTkwHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.sjlPFqj0TiKReEKq_5GAMAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.z_b4wAuUZIXtbHN1LLguowHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.-pxsuj9pFN38UpqpHtWsHAHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.7z8KiUwYWqWArmN3PKaQFAHaGr&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.4BlpXFHJlzztE7A1OyApQgHaF7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.j_W6CQBWxPPpfvykykeD8QHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.o7_E0uBfCqsDK3fHj5fswQAAAA&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.PkcVUvm9LGh8q87FgT0igQHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Front Right Suspension Strut Assembly",
            //                 minPrice: 200,
            //                 maxPrice: 500,
            //                 description:
            //                     "OEM Front Right Suspension Strut Assembly for Mercedes Benz C300 2013",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.KcNRd-0O44TBJUhfNmhTkwHaHa&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.KcNRd-0O44TBJUhfNmhTkwHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.lvAzZ7dlkxi9V8rrxiGyLQHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.sjlPFqj0TiKReEKq_5GAMAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.4BlpXFHJlzztE7A1OyApQgHaF7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.cn_YyhMPiCHOWS-4yDM_0AHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.oRLamERGXqE2gCEeUrR5JgHaEJ&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.H1HOK139Kq_VrjvgwbML2AHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.j_W6CQBWxPPpfvykykeD8QHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.MUXgg7qfvrYcInX0U34LjQHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.9wtYX9kUpbAWY4HDQ12ghwHaHv&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "suspension_strut_assembly",
            //     },
            //     {
            //         name: "Coil Spring",
            //         variations: [
            //             {
            //                 title: "Rear Coil Spring",
            //                 minPrice: 100,
            //                 maxPrice: 300,
            //                 description:
            //                     "Replacement Rear Coil Spring for Mercedes Benz C300 2013",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.rYRabHsFaKrZj5AWVLmPdgHaEK&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.rYRabHsFaKrZj5AWVLmPdgHaEK&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.bq1CFe6qtMNZ_FasKMDNNwAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.wAD5-Tj9C4hRBmfsxm5KnwHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.wJlXTtPwT_6tv63mjkBAHgAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.qEDXVbT15vf3AMF8Eba1HAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.yeGKQIyrvNAz8_ylCz53yAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.d-lJPHEbqIjp9vIdivmYOAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.9SCPiRGSfy7t2nlu-CvLZwHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.2KvpueQAKgaJc8JSoW2-CAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.F-yBCsVYIOkmOPFCX873PQHaE7&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "coil_spring",
            //     },
            //     {
            //         name: "Control Arm",
            //         variations: [
            //             {
            //                 title: "Front Lower Control Arm",
            //                 minPrice: 150,
            //                 maxPrice: 400,
            //                 description:
            //                     "Aftermarket Front Lower Control Arm for Mercedes Benz C300 2013",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.QPQYcXc1MqGjUNRRqGx1NAHaHa&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.QPQYcXc1MqGjUNRRqGx1NAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.Rr8ebRjnUngWlPZLY3TfrAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP._t2B4sr1KPsFApCk0zK9ogHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.17E0WRl4aXSBwsjID3fLAgHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.qKC9hG6lZqCS32pdgfi5TgHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.Axr8WvhvH0cl-Ja4BR8C6AHaHa&pid=Api",
            //                     "https://tse1.explicit.bing.net/th?id=OIP.zjOp84jqSNvrmfljPMG1FAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.9vRGfqrFo0VLOvcEcRERDAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.Oj11-hlGrj6kpDUrZBuqzwAAAA&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.QZ2klswWpZsiaNoz4DHNjQHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Rear Upper Control Arm",
            //                 minPrice: 120,
            //                 maxPrice: 350,
            //                 description:
            //                     "OEM Rear Upper Control Arm for Mercedes Benz C300 2013",
            //                 image: "https://tse3.explicit.bing.net/th?id=OIP.McZ6vawfHeY-FpWBp_rmNgHaFj&pid=Api",
            //                 images: [
            //                     "https://tse3.explicit.bing.net/th?id=OIP.McZ6vawfHeY-FpWBp_rmNgHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP._7139wy25HLVKr40cegLQwHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.L5-uiHRuSOTiawyI7vb-CwHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.AVK0k21QxiIBBaCUHdxLAwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.OjK2A2X5TMe4jRv5v6v7EwHaE8&pid=Api",
            //                     "https://tse4.explicit.bing.net/th?id=OIP.XX95ByRNVTtEc9kHPaFXjAHaHa&pid=Api",
            //                     "https://tse3.explicit.bing.net/th?id=OIP.Ia84sq3ljaYO4bTOkG0sJAHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.6AzgrrI17qpehL2E6Jbb1AHaE-&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.ivH5hZGINhcqJcsq6o7KUQHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.3u_1xhgEDfqkYOQYm-81_wHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "control_arm",
            //     },
            //     {
            //         name: "Stabilizer Bar Link",
            //         variations: [
            //             {
            //                 title: "Front Stabilizer Bar Link",
            //                 minPrice: 50,
            //                 maxPrice: 150,
            //                 description:
            //                     "Replacement Front Stabilizer Bar Link for Mercedes Benz C300 2013",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.lf29_n5hslQQirUvoQY5FgHaFj&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.lf29_n5hslQQirUvoQY5FgHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.wuSSX8KL11AwBimNCBg4ZAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.Vnk92tQwBePy_5Zby0uXwgHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.kTAhWXQK-m7YFqx8vZIvugHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.-g-6O6wjkMbdrpdkCGSZnQHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.hYokSUUofJ-0DCykU0nzlQHaE6&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.8-bKSbVQm6Xb34_1e6OkzAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.Xwx0ZRH0Vz-nTtoepIOBbgHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5VSr3hy3lCrMTVdMoYa_IQHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.JW_nKm2YgHx6royB2HI0HQAAAA&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "stabilizer_bar_link",
            //     },
            //     {
            //         name: "Transmission",
            //         variations: [
            //             {
            //                 title: "Automatic Transmission Assembly",
            //                 minPrice: 2500,
            //                 maxPrice: 4000,
            //                 id: 1,
            //                 description:
            //                     "Complete automatic transmission assembly for Mercedes Benz C300 2013",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.DdZWVU2A0nsc4vP4vPPi_AHaE7&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.DdZWVU2A0nsc4vP4vPPi_AHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.58YzRxsgvq9SJPADVzp14AHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.aUAjNPhuk2OHxgn0YQoHgAHaPX&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.hJFCsHZRuP-4lLXfH8KTegAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.MdnRwET35VbQXmoRD-E4zgAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.sn8QTLSp0tm02Tao-PTMLwHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.LfRbteqE04S9AcskcXiGjgHaFh&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.kDe-a_gIzxJoMU3K3fxr1wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.GvnS59Qsrzp8tdWVK_m55AHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.UXLiODGyZ3EOVLQJu-IKsAHaDZ&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Transmission Filter",
            //                 minPrice: 50,
            //                 maxPrice: 150,
            //                 id: 2,
            //                 description:
            //                     "Transmission filter for Mercedes Benz C300 2013",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.7yaQ0iVVeyJnHf_4s8uc8wHaE8&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.7yaQ0iVVeyJnHf_4s8uc8wHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.MpnT_ZzUUU8qxFo7blTueAHaFS&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.BPbRVpzy1k7J2SUof55rjQHaE8&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.i_C-7EZe3TORYF8wf58nMQHaFU&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.j_F0uTsfWB-BhqHF-DOcHwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.3e71WRY0i0hzIwdvlBp7PQHaEW&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.Cqu1HnqsVHskjun3DrQvRgHaDV&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.BNFFnyAjwAmzt7rVYOBgjwAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.-FcqWPtJFEr9E2a1GMcRpwAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.KCY-E24dMBgnbpmu9AXXLQHaJ4&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Transmission Solenoid",
            //                 minPrice: 100,
            //                 maxPrice: 300,
            //                 id: 3,
            //                 description:
            //                     "Transmission solenoid for Mercedes Benz C300 2013",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.HtSsETiol7HEz0UQtm7M3gHaHi&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.HtSsETiol7HEz0UQtm7M3gHaHi&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.gplCfO_RKt6LiN61e3Jb6AHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.YMTzwY7CmIiNd7_FLe97bwHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.P62ln_9iToy_AgtzATZuvwAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.DWVtr3htyyg9wLY3y89GTAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.wByfAjp7Vv9iafu_hZrUSAHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.qSitc-2GgSO085iVWr5oHQAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.Vf6BRK3Z60zsHqaSypE6wQHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.XRzKKwK8ADPHwxRTmcaK8gHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.E_k_iQP89MMPlTJuhlpBbAHaFj&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Transmission Control Module",
            //                 minPrice: 500,
            //                 maxPrice: 800,
            //                 id: 4,
            //                 description:
            //                     "Transmission control module for Mercedes Benz C300 2013",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.Kr-gSLYJZsHK_d6CHNPrmgHaF3&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.Kr-gSLYJZsHK_d6CHNPrmgHaF3&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.N17ma-1mYHa1viNBRlOiCAHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.PNCjKd-TPS-lLn5E_KJbegHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.pw1SxRergDJT_67qzf9SAAHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.OgO3MWix_Y9OObSOHI-3WgHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.3wGq1m1mcKFGVKqhS1LCMQHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.Xd_1BvmIAafVAXkW4ajIigHaGg&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.lBK-eRw56wj-UH_YWeXhggHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.WEFwBFqOS_qM4AoV8yhdtAHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.EeI8NQaQ5Qz66uBdt7K-KgAAAA&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Shift Solenoid",
            //                 minPrice: 80,
            //                 maxPrice: 200,
            //                 id: 5,
            //                 description:
            //                     "Shift solenoid for Mercedes Benz C300 2013",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.qaofX0bX-svjSuOuSUCWFwHaGe&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.qaofX0bX-svjSuOuSUCWFwHaGe&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.gplCfO_RKt6LiN61e3Jb6AHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.M_vDQFrYveuZAFh92XhFGwHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.P62ln_9iToy_AgtzATZuvwAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.E_k_iQP89MMPlTJuhlpBbAHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.Vf6BRK3Z60zsHqaSypE6wQHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.qSitc-2GgSO085iVWr5oHQAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.uVrqww068pJZVykTgXyzrAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.hdbI9RMP7mDwhlessefFYAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.XRzKKwK8ADPHwxRTmcaK8gHaFj&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Transmission Pan",
            //                 minPrice: 30,
            //                 maxPrice: 100,
            //                 id: 6,
            //                 description:
            //                     "Transmission pan for Mercedes Benz C300 2013",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.MCSTYDx_uSbPEMkm0iAFPAHaHa&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.MCSTYDx_uSbPEMkm0iAFPAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.FAzyjup06wpKSqSkdbxNrAHaFB&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.Z76PLtHrKKSi2mFbyaNqOwHaIC&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.D366FAUnkX9913TefHTawgHaFU&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.BPbRVpzy1k7J2SUof55rjQHaE8&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.nQIRnGAyb5iZviq9ZCszpQHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.Bw2dOvxbjm7aJz8fLrSHNwHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.p5GGAP0o-7mzW0trqCbojwHaH1&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.z5mFDRx-S9wsCtVOdMSLPQHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.SfqjMcAqeYS3obnFaep8RQHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "transmission",
            //     },
            //     {
            //         name: "Front Driver Seat",
            //         variations: [
            //             {
            //                 title: "Leather Seat",
            //                 minPrice: 1200,
            //                 maxPrice: 2500,
            //                 id: 1,
            //                 description:
            //                     "Mercedes benz c300 2013 front driver leather seat, excellent condition",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.LPvT0WEV9z_n20p_MQuHIwHaHa&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.LPvT0WEV9z_n20p_MQuHIwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.KpXUVPZ1Q6RQGgaE3uwuxQHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.O20CPnrCUhP3d9MzRS9oRAHaJZ&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.rx9fO1Vvjhvl9BXYXNes4wHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.9Zeg7GVJ9nrs66U9Z2S-_gHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RPnFqTxPKP8SHY1-XHR9agHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.L1Ilt5qi6fwV-DysRjEX7QHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.4EL_ynHI24x1t-HLbQFWMAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.6OuScrL24j2JEFbLjEpzpgHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.HyvQRxU3bvw_idbAQqQH2QHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Sport Seat",
            //                 minPrice: 1000,
            //                 maxPrice: 2200,
            //                 id: 2,
            //                 description:
            //                     "Mercedes benz c300 2013 front driver sport seat, good condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.0BRFS8kloiDEd0tNFgCtrwHaEK&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.0BRFS8kloiDEd0tNFgCtrwHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.VYFhMN0J6d83aSwWq6hA_QHaE6&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP._BEA-R9e7PQy2PyP0cPA4QHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.SKw_Tb9wbYCEnoQVCFOSVQHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.rS4xYLuPd_OEfQd--2DZaAHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.6iTZGNrW88HjbA7tZrWbOQHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.AftNeBq6u0gSB1H4A4lHXAHaEh&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.pHB-Rod8JMbUaGRawauPXgHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.L1Ilt5qi6fwV-DysRjEX7QHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.IYrU4yKtNUf465zIJriMNwHaE6&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "front_driver_seat",
            //     },
            //     {
            //         name: "Rear Left Door Panel",
            //         variations: [
            //             {
            //                 title: "Black Panel",
            //                 minPrice: 400,
            //                 maxPrice: 800,
            //                 id: 3,
            //                 description:
            //                     "Mercedes benz c300 2013 rear left door panel in black, used condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.0GlvxbyIVmRBcR5DNsSx8gHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.5wHitFPpY1Q2b-Sl6IVLaQHaE5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.rS4xYLuPd_OEfQd--2DZaAHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.agBXNphtd3kpxHvSdEeGGgHaE5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.U4Ydl8ps_C38-8WIrSbsOAHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Beige Panel",
            //                 minPrice: 350,
            //                 maxPrice: 700,
            //                 id: 4,
            //                 description:
            //                     "Mercedes benz c300 2013 rear left door panel in beige, good condition",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.InFKD8ypaoVXVc-JZ65IjAHaE9&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.VMkQl2v-tK9eAYjkAW06DgHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.gyYesLJ_NucdVXZbQrLCVQHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "rear_left_door_panel",
            //     },
            //     {
            //         name: "Rear Right Door Panel",
            //         variations: [
            //             {
            //                 title: "Black Panel",
            //                 minPrice: 400,
            //                 maxPrice: 800,
            //                 id: 5,
            //                 description:
            //                     "Mercedes benz c300 2013 rear right door panel in black, used condition",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.QOZwZ8qSgy8qRmq0OBBFtAHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.ZbQzSamNd0RlFIuZEhhuJQHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.rS4xYLuPd_OEfQd--2DZaAHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Beige Panel",
            //                 minPrice: 350,
            //                 maxPrice: 700,
            //                 id: 6,
            //                 description:
            //                     "Mercedes benz c300 2013 rear right door panel in beige, good condition",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.InFKD8ypaoVXVc-JZ65IjAHaE9&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.gyYesLJ_NucdVXZbQrLCVQHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.pO-SKK_XS2y5s3Q8w4NoJwHaE8&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "rear_right_door_panel",
            //     },
            //     {
            //         name: "Console",
            //         variations: [
            //             {
            //                 title: "Wooden Finish",
            //                 minPrice: 800,
            //                 maxPrice: 1800,
            //                 id: 7,
            //                 description:
            //                     "Mercedes benz c300 2013 console with wooden finish, like new",
            //                 image: "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                 images: [
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.InFKD8ypaoVXVc-JZ65IjAHaE9&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.HRP4x1UrMAK-OBRPRyXKmwHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.yUiMWjyM4vs_Hn6gXu2OzAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.qtLvBlPpOF0jaksko173VAHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OaKR_Ynzo3GmGMRRt0k0OgHaE7&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Aluminum Finish",
            //                 minPrice: 700,
            //                 maxPrice: 1500,
            //                 id: 8,
            //                 description:
            //                     "Mercedes benz c300 2013 console with aluminum finish, good condition",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.c93nSe7AAvlg0PJZqvd9SQHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nkzjxFh4FxjOqnQpJcUDkwHaEo&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.O_kB-ZgPFxA_OQ6e9WKs6wHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.mCxEzKMhBcJd0PUlhGHLEAHaE5&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.taBA7H7TS-sv6_JfPEQlRAHaEK&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.InFKD8ypaoVXVc-JZ65IjAHaE9&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.U1ba5dgkCnUhyHUeUavbpAHaE9&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.QOZwZ8qSgy8qRmq0OBBFtAHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.OiO3tXt-rBYNB_xs9cnGUQHaE8&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.OerW2rXi_3zWiMZd_Id7OQHaDd&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "console",
            //     },
            //     {
            //         name: "Door Control Module",
            //         variations: [
            //             {
            //                 title: "Front Left Door Control Module",
            //                 minPrice: 300,
            //                 maxPrice: 600,
            //                 id: 1,
            //                 description:
            //                     "Mercedes benz c300 2013 front left door control module, new",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.1L17AJWwcjh-btouiYOZywHaFj&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.1L17AJWwcjh-btouiYOZywHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RPA59N-ymXcxD15UXjjkyQHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.FIdy4TGzPaJTZjFjDXUzeAHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.WZHbDxprJAvYsA8FxHb_AAHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.icSNuhxhAE6kksIwJ2Ka_wAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.acTO9q4n1FIY0mLNFPoZYAHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.hHKsEVJYDGQFg-YqhjzQzQHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.u3ypChNYwwX7xdyA7-etmwAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.snP2vV9Ut03iYZPB3hErvAHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.45vG12fYUyCWAXFP58-DMAHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Front Right Door Control Module",
            //                 minPrice: 300,
            //                 maxPrice: 600,
            //                 id: 2,
            //                 description:
            //                     "Mercedes benz c300 2013 front right door control module, new",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.SfhGLiGK0bKmtAVJPsTRIwHaGk&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.SfhGLiGK0bKmtAVJPsTRIwHaGk&pid=Api",
            //                     "https://tse3.explicit.bing.net/th?id=OIP.5ZmSdydhZIqKmIA9q6uJngAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.iNWKDFU18F1Z61w26DC2dAHaE7&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.jGdhwSYEW0i9YfnxFPjkkQAAAA&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.QHWkMqGD2yCINYDaqGUEVwHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.X4H8RF5mS_InMOHEl88WegHaFh&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.LEtZHjmQY5WCd7HBe4j2qQHaE8&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.0FRkfS4dd8TCYVPQX6RpQgAAAA&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.f3fwIgfQhp52TyNXDCLPjAHaFj&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.jppVFGhWBOUZSxL2MMt67gAAAA&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Rear Left Door Control Module",
            //                 minPrice: 250,
            //                 maxPrice: 550,
            //                 id: 3,
            //                 description:
            //                     "Mercedes benz c300 2013 rear left door control module, used",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.1L17AJWwcjh-btouiYOZywHaFj&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.1L17AJWwcjh-btouiYOZywHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.9pK7RViez2e_ZtrZEiKUnAHaGH&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.FIdy4TGzPaJTZjFjDXUzeAHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RPA59N-ymXcxD15UXjjkyQHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.snP2vV9Ut03iYZPB3hErvAHaFj&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c-bVug3Y52RIHvgOKM-kVAHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.0U77Ny2On12ROfYEH0QzLQHaE7&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.GjGJUtWaw6Eh4_ZW5yTgmQHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.WZHbDxprJAvYsA8FxHb_AAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.WIkdTb-0TejEfghSZ_-YwQHaFj&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Rear Right Door Control Module",
            //                 minPrice: 250,
            //                 maxPrice: 550,
            //                 id: 4,
            //                 description:
            //                     "Mercedes benz c300 2013 rear right door control module, used",
            //                 image: "https://tse3.explicit.bing.net/th?id=OIP.5ZmSdydhZIqKmIA9q6uJngAAAA&pid=Api",
            //                 images: [
            //                     "https://tse3.explicit.bing.net/th?id=OIP.5ZmSdydhZIqKmIA9q6uJngAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.iNWKDFU18F1Z61w26DC2dAHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.9pK7RViez2e_ZtrZEiKUnAHaGH&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.0FRkfS4dd8TCYVPQX6RpQgAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.3PhATTBOUCU55MbUg-40MwHaEK&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.1mSv4d0K63txLbDantZfeQHaGD&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.c-bVug3Y52RIHvgOKM-kVAHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.jGdhwSYEW0i9YfnxFPjkkQAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.berUg4LK4s7U_t-xKR_WmwHaJ4&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.xzJU9z-gp-4HgutEMRompAHaFj&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "door_control_module",
            //     },
            //     {
            //         name: "Ignition Switch",
            //         variations: [
            //             {
            //                 title: "Ignition Switch Assembly",
            //                 minPrice: 150,
            //                 maxPrice: 300,
            //                 id: 5,
            //                 description:
            //                     "Mercedes benz c300 2013 ignition switch assembly, new",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.vrDDKW3RtijHFo51lrRxRgAAAA&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.vrDDKW3RtijHFo51lrRxRgAAAA&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.twcxGTfA-eJUUS4uV8EMIQAAAA&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.nMM77ysgDois3jzPcsksKwHaE8&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.PtuLvi7aBj2Nc4DaccvI2wHaE8&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.zTEW82_ihAnscp0bqp2LCAAAAA&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.KBAr-W2YaYdA4YsoRBQEPQHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.QW4HHr1o4Pj6p1AHEZ5qaQHaEc&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.yWnirhsJQhPTPz1bFgbcQAHaE7&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.IOWZRcb9Gkus-1h_a5FxUQHaE7&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.4k7-lajon4bkeE5MbWvQjQHaE7&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "ignition_switch",
            //     },
            //     {
            //         name: "Central Locking System Actuator",
            //         variations: [
            //             {
            //                 title: "Central Locking System Actuator Set",
            //                 minPrice: 200,
            //                 maxPrice: 400,
            //                 id: 6,
            //                 description:
            //                     "Mercedes benz c300 2013 central locking system actuator set, used",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.w9k07sZ0u24byoCbdiMNiQHaFD&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.w9k07sZ0u24byoCbdiMNiQHaFD&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.0dfTktd8PvLMTfRiHKFhigHaGB&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.dffT6UX874JgcOpl3FV8IwHaE8&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.e6buWeSkNdv9w-3TbtUcFwHaEQ&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.R8PtfE3Qa6dErpFRPDNU9gHaFT&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.LQoGHu8xkEj7OAQjYET5kAHaGF&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.6pNy_EgkAT8YJyfvYme08QHaEW&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.uOL4tfJjo1Lcbdf23ACAQgHaEK&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.iEOCU2mz_8Aw3KDZo4EL2wHaFj&pid=Api",
            //                     "https://tse2.explicit.bing.net/th?id=OIP.kFF4ecPvHNS0RskSy-0yCgHaEK&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "central_locking_system_actuator",
            //     },
            //     {
            //         name: "Power Window Switch",
            //         variations: [
            //             {
            //                 title: "Front Driver Power Window Switch",
            //                 minPrice: 100,
            //                 maxPrice: 200,
            //                 id: 7,
            //                 description:
            //                     "Mercedes benz c300 2013 front driver power window switch, new",
            //                 image: "https://tse1.mm.bing.net/th?id=OIP.yg_wFJCBrU3PKlbB05gRywHaHa&pid=Api",
            //                 images: [
            //                     "https://tse1.mm.bing.net/th?id=OIP.yg_wFJCBrU3PKlbB05gRywHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.GwiowE_VeLsMrm-lsivnegHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.YKpnsw5fVpuK0BhNQ_sd4QHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.B7Ub_w51Ml-B939hbkaXHAAAAA&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.zL6zTqtaIcqQ0ZT14O8jrAAAAA&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.BkAB_y-Q2fb1PDDwF0YeyQHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.w5pAHBz_pXMg66yvxnIK8gHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.v5bwxN9ktn0O5UrlFI-BmgHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.98hYH4LGwqjWeY53ngCFlAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.oGaBJWfEGPzgbXeJ7lnEIAAAAA&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Front Passenger Power Window Switch",
            //                 minPrice: 100,
            //                 maxPrice: 200,
            //                 id: 8,
            //                 description:
            //                     "Mercedes benz c300 2013 front passenger power window switch, new",
            //                 image: "https://tse3.mm.bing.net/th?id=OIP.GwiowE_VeLsMrm-lsivnegHaHa&pid=Api",
            //                 images: [
            //                     "https://tse3.mm.bing.net/th?id=OIP.GwiowE_VeLsMrm-lsivnegHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.YKpnsw5fVpuK0BhNQ_sd4QHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.q8Bp-G_8QNx3Phd53zCCsgHaFj&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.CE6m1GVYb_cWxup7JmOAFgHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.2yJo9e8hUKFNT3j1XY3VRAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.4NStPSb3Xyfrsh0ftD3hWgHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.QL4GiXDHwk1O8eDmzRMzLQHaIU&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.jfVPxEoz2kBHfVY81yEljAHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.O6lD3cnEdmcuJ50TKWRUCwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.oGaBJWfEGPzgbXeJ7lnEIAAAAA&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Rear Left Power Window Switch",
            //                 minPrice: 80,
            //                 maxPrice: 180,
            //                 id: 9,
            //                 description:
            //                     "Mercedes benz c300 2013 rear left power window switch, used",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.YKpnsw5fVpuK0BhNQ_sd4QHaHa&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.YKpnsw5fVpuK0BhNQ_sd4QHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.84YN938vIbwC_Si2n3HaTAHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.HoasKa6ZXtZpAOm4yCS5MwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.odGuDxi7TOYBxwKQRbvSTgHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.GwiowE_VeLsMrm-lsivnegHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.Q0aBel1eNxM-Aur66mWOxwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.14Stf4dWytlbTGHN-Y8eUQHaHa&pid=Api",
            //                     "https://tse4.mm.bing.net/th?id=OIP.qtYEa_KoEY4muZDU0FVNJAHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.VQalqXJbiCeuO5hWGfnDxgHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.RAAYf8Br4vNfJPbjI4pMrQHaHa&pid=Api",
            //                 ],
            //             },
            //             {
            //                 title: "Rear Right Power Window Switch",
            //                 minPrice: 80,
            //                 maxPrice: 180,
            //                 id: 10,
            //                 description:
            //                     "Mercedes benz c300 2013 rear right power window switch, used",
            //                 image: "https://tse4.mm.bing.net/th?id=OIP.YKpnsw5fVpuK0BhNQ_sd4QHaHa&pid=Api",
            //                 images: [
            //                     "https://tse4.mm.bing.net/th?id=OIP.YKpnsw5fVpuK0BhNQ_sd4QHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.HoasKa6ZXtZpAOm4yCS5MwHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.E2-jQRhH7heK7jky3IIaDwHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.6BMRLHFqsthKE3ksNQvn4QHaFj&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.FoZX75Jsjv0PotwZzbzkzQHaHa&pid=Api",
            //                     "https://tse2.mm.bing.net/th?id=OIP.5nDwGNmM7xgfj6OYR8o6XgHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.GwiowE_VeLsMrm-lsivnegHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.4eNtIFYt_BbJGe2tTg1U2gHaHa&pid=Api",
            //                     "https://tse1.mm.bing.net/th?id=OIP.K1LI4u_WT-xWFr5rCoCb-gHaHa&pid=Api",
            //                     "https://tse3.mm.bing.net/th?id=OIP.odGuDxi7TOYBxwKQRbvSTgHaHa&pid=Api",
            //                 ],
            //             },
            //         ],
            //         key: "power_window_switch",
            //     },
            // ]);
            setIsLoading(true);
            fetchParts().then((response) => {
                if (response?.status > 205) {
                    toast.error("Something went wrong try again please.", {
                        className: "fs-14",
                    });
                } else {
                    setData(response.data["parts"]);
                }
                setIsLoading(false);
            });
        }
    }, [query]);

    const [formData, setFormData] = useState({});

    const changeModalData = (data, fn) => {
        setModalData(data);
        setModalSuccessFn(() => fn); // Ensure the function is stored correctly
    };

    useEffect(() => {
        if (modalData) {
            modalOpenRef.current.click();
        }
    }, [modalData]);

    const onSubmit = () => {
        // get chatgpt api to show all part outs of that car and drawed images
        // ask for location of car, and is the make and model and year is right?
        // submit all data to backend
        // backend should save in db model mentioned as car
        // backend should post them in ebay
        // backend should give to list them
        // backend should give them to edit products
    };

    if (isLoading) {
        return (
            <div
                className="d-flex bg-gray-50 flex-column justify-content-center align-items-center min-vh-100 min-vw-100 position-absolute top-0 "
                style={{ zIndex: 1000 }}
            >
                <div className="mb-4 text-center">
                    <div className="h3 fw-bold ">
                        Fetching parts please wait 30-60 seconds
                    </div>
                    <p className="fs-14 ">Thank you</p>
                </div>
                <div
                    class="spinner-border text-main bg-white"
                    style={{ padding: 110 }}
                    role="status"
                ></div>
                {/* <div
                    className="d-flex position-absolute align-items-center"
                    style={{ top: "51%" }}
                >
                    
                </div>
                <div className="text-muted fs-14 mt-4 text-decoration-underline">
                    {t("something_wrong")}
                </div> */}
            </div>
        );
    }

    return (
        <div>
            <PartModel modalData={modalData} modalSuccessFn={modalSuccessFn}>
                <div ref={modalOpenRef}></div>
            </PartModel>
            <div className="bg-white mx-3 rounded-small p-3 mt-3 d-flex justify-content-between align-items-center">
                <div
                    className="text-muted"
                    role="button"
                    onClick={() => router.back()}
                >
                    {" "}
                    <i class="bi bi-arrow-left-circle fs-5"></i>
                </div>
                <div className="text-center fw-bold h3 mt-3 text-dark">
                    {query} <span className="text-secondary">parts</span>
                </div>
                <div></div>
            </div>

            {data &&
                data.length > 0 &&
                data.map((item, index) => (
                    <PartVariationSection
                        key={index}
                        item={item}
                        formData={formData}
                        setFormData={setFormData}
                        changeModalData={changeModalData}
                    />
                ))}

            <div className="bg-white mx-3 rounded-small p-3 mt-3 mb-4 d-flex justify-content-end align-items-center">
                <button
                    type="button"
                    disabled={Object.keys(formData).length < 1}
                    class="btn btn-primary fs-15 rounded-small fw-medium"
                >
                    Post ({Object.keys(formData).length} parts)
                </button>
            </div>
        </div>
    );
}

export default Page;
