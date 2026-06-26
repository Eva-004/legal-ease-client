"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EditComment = ({handleCommentEdit,commentData}) => {
    const [editedComment, setEditedComment] = useState(commentData?.comment || "");
    return (
        <div>
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
                                
                                <Modal.Heading>Edit Comment</Modal.Heading>

                            </Modal.Header>
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form className="flex flex-col gap-4">
                                        <Input

                                            placeholder="Example: Family Law Consultation"
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}

                                        />
                                        <div className="flex items-center gap-2">
                                            <Button slot="close" variant="secondary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => handleCommentEdit(commentData._id, editedComment)} slot="close">Edit</Button>
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
        </div>
    );
};

export default EditComment;