"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ChangeRole = ({handleRoleChange,user}) => {
    const [editedRole, setRole] = useState(user?.role || "");
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
                   Change Role
                </Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                
                                <Modal.Heading>Change Role</Modal.Heading>

                            </Modal.Header>
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form className="flex flex-col gap-4">
                                        <Input

                                            placeholder="Example: user"
                                            value={editedRole}
                                            onChange={(e) => setRole(e.target.value)}

                                        />
                                        <div className="flex items-center gap-2">
                                            <Button slot="close" variant="secondary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => handleRoleChange(user._id, editedRole)} slot="close">Change</Button>
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

export default ChangeRole;