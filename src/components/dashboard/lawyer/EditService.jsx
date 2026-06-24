"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
const EditService = ({ handleEditService, service }) => {
    const [editedService, setEditedService] = useState(service?.title || "");
    return (
        <Modal>
            <Button

                isIconOnly
                size="sm"
                color="warning"
                className={'text-cyan-600'}
                variant="flat"
            >
                <FaEdit />
                Edit
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Edit Service</Modal.Heading>

                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form className="flex flex-col gap-4">
                                    <Input
                                      
                                        placeholder="Example: Family Law Consultation"
                                        value={editedService}
                                        onChange={(e) => setEditedService(e.target.value)}

                                    />
                                    <div className="flex items-center gap-2">
                                        <Button slot="close" variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => handleEditService(service.id, editedService)} slot="close">Edit</Button>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditService;