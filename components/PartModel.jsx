import React, { useEffect, useRef, useState } from "react";

function PartModel({ children, modalData, modalSuccessFn }) {
    const [localFormData, setLocalFormData] = useState(null);

    const onSubmit = () => {
        console.log("Success", modalSuccessFn, modalData);
        modalSuccessFn(localFormData);
        closeBtnRef.current.click();
    };

    useEffect(() => {
        setLocalFormData(modalData);
    }, [modalData]);

    const closeBtnRef = useRef();
    return (
        <div>
            <div data-bs-toggle="modal" data-bs-target="#partModal">
                {children}
            </div>

            <div
                class="modal fade "
                id="partModal"
                tabindex="-1"
                aria-labelledby="partModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-lg">
                    <div class="modal-content rounded-small border-0">
                        <div class=" px-4 py-3 border-bottom">
                            <h1
                                class="modal-title fw-bold fs-6"
                                id="partModalLabel"
                            >
                                {localFormData?.title}
                            </h1>
                        </div>
                        <div class="modal-body text-center">
                            <div className="d-flex justify-content-center gap-3">
                                <div className="" style={{ width: "200px" }}>
                                    <img
                                        className="img-fluid"
                                        src="https://i.ebayimg.com/images/g/aaYAAOSwEoth6GJr/s-l400.jpg"
                                        alt=""
                                    />

                                    {/* Title */}
                                    {/* Price */}
                                    {/* Description */}
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="exampleInputEmail1"
                                        class="form-label fw-medium fs-15"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control fs-14 shadow-none border rounded-small small-placeholder"
                                        id="title"
                                        value={localFormData?.title}
                                        onChange={(e) =>
                                            setLocalFormData({
                                                ...localFormData,
                                                title: e.target.value,
                                            })
                                        }
                                        placeholder="Engine"
                                        aria-describedby="emailHelp"
                                    />
                                    <div
                                        id="emailHelp"
                                        class="form-text fs-12 text-start"
                                    >
                                        Title for showing in marketplaces
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label
                                        for="exampleInputEmail1"
                                        class="form-label fw-medium fs-15"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        class="form-control fs-14 shadow-none border rounded-small small-placeholder"
                                        id="price"
                                        value={localFormData?.price}
                                        onChange={(e) =>
                                            setLocalFormData({
                                                ...localFormData,
                                                price: e.target.value,
                                            })
                                        }
                                        placeholder="Price for "
                                        aria-describedby="emailHelp"
                                    />
                                    <div
                                        id="emailHelp"
                                        class="form-text fs-12 text-start"
                                    >
                                        Price is minimal in market
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label
                                        for="exampleInputEmail1"
                                        class="form-label fw-medium fs-15"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        rows={5}
                                        cols={30}
                                        class="form-control fs-14 shadow-none border rounded-small small-placeholder"
                                        id="description"
                                        value={localFormData?.description}
                                        onChange={(e) =>
                                            setLocalFormData({
                                                ...localFormData,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Engine"
                                        aria-describedby="emailHelp"
                                    ></textarea>
                                    <div
                                        id="emailHelp"
                                        class="form-text fs-12 text-start"
                                    >
                                        Description is ready to show what can we
                                        add about this part
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary fs-15 rounded-small fw-medium"
                                data-bs-dismiss="modal"
                                ref={closeBtnRef}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    onSubmit();
                                }}
                                class="btn btn-primary fs-15 rounded-small fw-medium"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Model opening with showing image, name, price input, average price at stock, description and everything should be editable */}
        </div>
    );
}

export default PartModel;
