'use client'
import { authClient } from "@/lib/auth-client";
import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaHandHoldingHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const HireConfirmModal = ({ lawyer }) => {
    const userData = authClient.useSession();
        const user = userData?.data?.user;
        console.log(user);
        const router = useRouter();
    const handleHire = async()=>{
        const { data: tokenData } = await authClient.token();
         const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hire-lawyer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify({
            userId:user?.id,
            userName: user?.name,
            lawyerId: lawyer._id,
            lawyerName: lawyer.name,
            fee: lawyer.consultationFee,
            specialization: lawyer.specialization,
          }),
        }
      );
      if (res.ok) {
              toast.success("Requested hiring successfully!")
           router.push('/dashboard/user/hiring-history')
        }
        else {
             toast.error("Failed to hiring request!")
        }
    }
    return (
        <Modal>
            <Button
                size="lg"
                className="mt-6 bg-[#1E3A8A] font-semibold flex items-center gap-2"
            >
                <FaHandHoldingHeart className="text-pink-200" />
                Hire Lawyer
            </Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-default text-foreground">
                                <Rocket className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Confirm Hiring</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-sm text-gray-600">
                  Are you sure you want to hire{" "}
                  <span className="font-semibold">{lawyer.name}</span>?
                </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button  onClick={handleHire} className="w-full bg-[#1E3A8A]" slot="close">
                                Confirm Hire
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default HireConfirmModal;