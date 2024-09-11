// cloning fastpartshub web app

"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
    const router = useRouter();
    const [carName, setCarName] = useState(null);
    return (
        <div style={{ minHeight: "100vh" }} className="d-flex flex-column ">
            <div className="header py-3 bg-white shadow-sm">
                <div className="text-center h2 text-primary fw-bold">
                    eParts
                </div>
            </div>

            <div
                className="mx-0 px-3 "
                style={{
                    background: 'url("/bg.jpg")',
                    backgroundSize: "cover", // Cover the entire area of the div
                    backgroundPosition: "center", // Center the background image
                    backgroundRepeat: "no-repeat",
                    flex: 1,
                    position: "relative", // Set position context for overlay
                }}
            >
                {/* Opacity Layer */}
                <div
                    style={{
                        position: "absolute", // Position overlay over the parent div
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Light black with 50% opacity
                        zIndex: 1, // Ensure overlay is above the background image
                    }}
                ></div>

                {/* Content Overlay */}
                <div>
                    <div
                        style={{ position: "relative", zIndex: 2 }}
                        className="row row-cols-md-2 py-5 justify-content-center align-items-center"
                    >
                        {" "}
                        {/* This component should be in center */}
                        <div className="py-5 text-white">
                            <div className="h1 fw-bold">Part out your car</div>
                            <div className="">
                                Using our app you can part out and post all
                                parts of your car onto eBay in just 10 minutes.
                            </div>
                        </div>
                        <div>
                            <div className="bg-white shadow-sm p-4">
                                <div className="text-center fw-bold  mb-3">
                                    Select car type
                                </div>
                                <div>
                                    <form className="fs-14">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="exampleInputEmail1"
                                                className="form-label"
                                            >
                                                Which car do you have
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control fs-14 shadow-none border rounded-small small-placeholder"
                                                id="exampleInputEmail1"
                                                value={carName}
                                                onChange={(e) =>
                                                    setCarName(e.target.value)
                                                }
                                                placeholder="Mercedes-Benz C300 2013"
                                                aria-describedby="emailHelp"
                                            />
                                            <div
                                                id="emailHelp"
                                                className="form-text"
                                            >
                                                For example: Silver Honda civic
                                                2002, Red Honda Insight 2010,
                                                Red Ford Fusion 2010
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (
                                                        carName &&
                                                        carName.length > 0
                                                    ) {
                                                        router.push(
                                                            `/parts/all?query=${carName}`
                                                        );
                                                    } else {
                                                        toast.error(
                                                            "Please fill something.",
                                                            {
                                                                className:
                                                                    "fs-14",
                                                            }
                                                        );
                                                    }
                                                }}
                                                className="btn btn-primary fs-14 fw-bold rounded-small"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 fs-12 px-3 pb-3 text-muted">
                <div>© 2024 by eParts. Powered and secured by Hackathon</div>
            </div>
        </div>
    );
}
