"use client";
import { AlertDialog, Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";

const DeleteUser = ({handleDeleteUser,user}) => {
    return (
        <div>
            <AlertDialog>
                        <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            className={'text-red-500'}
                            variant="flat"
                        >
                            <FaTrash />
                            Delete
                        </Button>
                        <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[400px]">
                                    <AlertDialog.CloseTrigger />
                                    <AlertDialog.Header>
                                        <AlertDialog.Icon status="danger" />
                                        <AlertDialog.Heading>Delete User permanently?</AlertDialog.Heading>
                                    </AlertDialog.Header>
                                    <AlertDialog.Body>
                                        <p>
                                            This will permanently delete <strong>{user?.name}</strong> and all of its
                                            data. This action cannot be undone.
                                        </p>
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button slot="close" variant="tertiary">
                                            Cancel
                                        </Button>
                                        <Button onClick={()=>handleDeleteUser (user._id)} slot="close" variant="danger">
                                            Delete
                                        </Button>
                                    </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                            </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                    </AlertDialog>
        </div>
    );
};

export default DeleteUser;