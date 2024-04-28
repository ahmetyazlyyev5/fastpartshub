import React, { useState } from "react";

function PartVariationSection({
    item,
    setFormData,
    formData,
    changeModalData,
}) {
    const [selected, setSelected] = useState(null);
    const selectVariation = (variation) => {
        if (selected && selected?.id === variation.id) {
            openModal();
            setSelected({
                ...variation,
                price: variation.minPrice,
            });
        } else {
            setSelected({
                ...variation,
                price: variation.minPrice,
            });
            setFormData({
                ...formData,
                [item.key]: {
                    ...variation,
                    price: variation.minPrice,
                },
            });
        }
    };
    const openModal = () => {
        changeModalData(selected, (res) => {
            if (res) {
                setSelected(res);
                console.log("Changed selected to res", res);
            }
        });
    };
    return (
        <div className="bg-white mx-3 rounded-small p-3 mt-3 px-5">
            <div>
                <div className="fw-bold h5 mt-3 mb-3">{item.name}</div>

                <div className="row row-cols-5 flex-wrap">
                    {item.variations.map((variation, index) => {
                        if (variation?.id && variation?.id === selected?.id) {
                            return (
                                <div key={index} className="px-1">
                                    <div
                                        className={`px-1 text-center fw-medium fs-15 ${
                                            variation?.id === selected?.id
                                                ? "border border-primary border-2 rounded-small"
                                                : ""
                                        }`}
                                    >
                                        <div className="">
                                            <img
                                                onClick={() => {
                                                    selectVariation(variation);
                                                }}
                                                role="button"
                                                className="img-fluid"
                                                src={variation.image}
                                                alt=""
                                            />
                                            <div>{selected?.title}</div>
                                            <div className="fw-bold">
                                                {selected?.price}$
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <div
                                                    onClick={() => {
                                                        openModal();
                                                    }}
                                                    role="button"
                                                >
                                                    Edit
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setSelected(null);
                                                        setFormData(
                                                            (prevFormData) => {
                                                                // Create a copy of the formData object
                                                                const updatedFormData =
                                                                    {
                                                                        ...prevFormData,
                                                                    };
                                                                // Delete the key from the copied formData object
                                                                delete updatedFormData[
                                                                    item.key
                                                                ];
                                                                // Return the new formData object which no longer has the deleted key
                                                                return updatedFormData;
                                                            }
                                                        );
                                                    }}
                                                    role="button"
                                                >
                                                    Diselect
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={index} className="px-1">
                                    <div
                                        className={`px-1 text-center fw-medium fs-15 `}
                                        role="button"
                                        onClick={() => {
                                            selectVariation(variation);
                                        }}
                                    >
                                        <div className="">
                                            <img
                                                className="img-fluid"
                                                src={variation.image}
                                                alt=""
                                            />
                                            <div>{variation.title}</div>
                                            <div className="fw-bold">
                                                {variation.minPrice}$ -{" "}
                                                {variation.maxPrice}$
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default PartVariationSection;
