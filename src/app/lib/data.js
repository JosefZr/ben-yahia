import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { FiMapPin } from "react-icons/fi";
export const links = [
    {
        name:"accueil",
        hash:"#accueil"
    },
    {
        name:"à propos de nous",
        hash:"#nous"
    },
    {
        name:"services",
        hash:"#services"
    },
    {
        name:"Témoignages",
        hash:"#Témoignages"
    },
    {
        name:"Contact",
        hash:"#Contact"
    },
]
export const footer = [
    {
        name: "number",
        content: "009990099",
        icon: <SlPhone />
    },
    {
        name: "number1",
        content: "009990099",
        icon: <SlPhone />
    },
    {
        name: "email",
        content: "example@example.example",
        icon: <MdOutlineEmail />
    },
    {
        name: "address",
        content: "Bordj bou arreridj, 5 juilier",
        icon: <FiMapPin />
    }
];
