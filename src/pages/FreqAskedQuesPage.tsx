import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import React from "react";
const FAQS=[
    {
      question:"How does Tunyce work?",
      description:"See tutorial",
    },
    {
      question:"Can I try Tunyce free of charge?",
      description:"I'm sorry, but the platform is not available for free. It requires a subscription or payment to access its feature",
    },
    {
      question:"Who can use the Tunyce platform?",
      description:"Our platform is open to all users. Anyone who meets the platform's terms of service and requirements can use it."
    },
    {
      question:"How do I get paid?",
      description:"To get paid using our platform, you'll need to provide your payment information in the account settings. After completing the necessary steps, you'll receive payments according to the platform's payment schedule and policies.",
    },
    {
      question:"Why can't I access my account?",
      description:"I'm sorry to hear that you're experiencing issues with the platform. You may not be able to access your account  due to various reasons, such as technical glitches, server problems, or maintenance. To resolve the issue, I recommend reaching out to support@tunycemedia.com for assistance.",
    },
    {
      question:"How do I delete my account?",
      description:"To delete your account, go to the account settings or profile section, and you should find an option to delete or deactivate your account. Follow the instructions provided to complete the process.",
    },
    {
      question:"What's required to run the Tunyce platform?",
      description:"Running our platform typically requires various components, such as already installed tv screens  in the case of restaurants and matatus and devices that have access to a web browser for other normal users.Additionally, our team will seamlessly integrate the system  into your Matatu or Restaurant without any disruption.",
    },
    {
      question:'Who can use the platform?',
      description:"The platform is open to all users as long as they meet the platform's terms and conditions"
    },
    {
      question:'How do I get paid as a content creator?',
      description:"To get paid using our platform, we will require you to provide information in the account settings. After completing the necessary steps, you'll receive payment according to the platform's payment schedule and policies"
    },
];
const Accordion = ({faq}:{faq:{question:string,description:string}}) => {
    const [show, setShow] = React.useState(false);
    return (
        <div onClick={() => setShow(!show)} style={{backgroundColor:'#ccc'}} className="w-full bg-white px-3 cursor-pointer rounded-md my-5">
            <div className="flex items-center py-3 justify-between">
                <h4 className="font-bold text-md">{faq.question}</h4>
                <button  className="text-text-primary">
                    {show ? <IoIosArrowDropupCircle className="text-2xl"/> : <IoIosArrowDropdownCircle className="text-2xl"/>}
                </button>
            </div>
            {show && <p className="text-sm font-semibold">{faq.description}</p>}
        </div>
    );
};
function FreqAskedQuesPage() {
    return (
        <div className="mt-8 w-full h-full">
            <h2 className="text-2xl text-text-primary font-bold">Frequently asked Questions</h2>
            <div className="mt-10">
                {FAQS.map((faq,index)=>(
                    <Accordion key={index} faq={faq}/>
                ))}
            </div>
        </div>
    );
}

export default FreqAskedQuesPage;