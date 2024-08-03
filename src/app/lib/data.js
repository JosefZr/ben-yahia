import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { FiMapPin } from "react-icons/fi";
import { useTranslations } from 'next-intl';


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

export const useNavbarLinks = () => {
  const t = useTranslations('Navbar');

  return [
    {
      name: t("home.name"),
      hash: t("home.hash"),
    },
    {
      name: t("services.name"),
      hash: t("services.hash"),
    },
    {
      name: t("us.name"),
      hash: t("us.hash"),
    },
    {
      name: t("contact.name"),
      hash: t("contact.hash"),
    },
    {
      name: t("ЛБ.name"),
      hash: t("ЛБ.hash"),
    }
  ];
};
// for the  services 
export const useServices =()=>{
    const t = useTranslations('Services');
        return[
        {
            titre: t("Implant.title"),
            content: t('Implant.description'),
            image: '/services/implant.webp',
            icon: "https://img.icons8.com/?size=100&id=GSlkzWZjhPmT&format=png&color=214030",
            direction: "left"
        },
        {
            titre: t("Braces.title"),
            content: t('Braces.description'),
            image: "/services/braces.webp",
            icon: "https://img.icons8.com/?size=100&id=ZDLptEjyNsEC&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Crown.title"),
            content: t('Crown.description'),
            image: "/services/crown.webp",
            icon: "https://img.icons8.com/?size=100&id=2j8774BkNjto&format=png&color=214030",
            direction: "left"
        },
        {
            titre: t("Filling.title"),
            content: t('Filling.description'),
            image: "/services/filling.webp",
            icon: "https://img.icons8.com/?size=100&id=9RFbbtSrKPzM&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Bridges.title"),
            content: t('Bridges.description'),
            image: "/services/bridges.webp",
            icon: "https://img.icons8.com/?size=100&id=Ax1nHq12vdvJ&format=png&color=214030",
            direction: "left"
        },
        {
            titre: t("Check.title"),
            content: t('Check.description'),
            image: "/services/check.webp",
            icon: "https://img.icons8.com/?size=100&id=Qynk0dQDDiY4&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Whitening.title"),
            content: t('Whitening.description'),
            image: "/services/whitening.webp",
            icon: "https://img.icons8.com/?size=100&id=TEEyuMyShFK0&format=png&color=214030",
            direction: "left"
        },
        {
            titre: t("Scaling.title"),
            content: t('Scaling.description'),
            image: "/services/scaling.webp",
            icon: "https://img.icons8.com/?size=100&id=7A92Y2BcmAqx&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Root.title"),
            content: t('Root.description'),
            image: "/services/root.webp",
            icon: "https://img.icons8.com/?size=100&id=olmK5dbavUrn&format=png&color=214030",
            direction: "left"
        },
        {
            titre: t("Wisdom.title"),
            content: t('Wisdom.description'),
            image: "/services/wisdom.webp",
            icon: "https://img.icons8.com/?size=100&id=eAO25vPIMU17&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Denture.title"),
            content: t('Denture.description'),
            image: "/services/dentures.webp",
            icon: "https://img.icons8.com/?size=100&id=wpfUlRXFcAiU&format=png&color=214030",
            direction: "left"
        },
    ];

}

//for the side bar admin
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { FaUserInjured } from "react-icons/fa";

export const navList= [{
    title:"accueil",
    url: "/admin" ,
    icon:<IoHomeOutline />,
},
{
    title:"patient",
    url:"/admin/patient",
    icon:<FaUserInjured />,
},
{
    title:"rendez-vous",
    url:"/admin/rendez-vous",
    icon:<SlCalender />,
},  {
    title:"docteur",
    url:"/admin/docteur",
    icon:<FaUserDoctor />,
},{
    title: "paramétre",
    icon: <IoSettingsOutline />,
    subMenu:true,
    subItems: [
        { title: "Settings", url: "/admin/settings" },
        { title: "Opening Hours", url: "/admin/opening" },
        { title: "Menu", url: "/admin/menu" },
    ],
},
];

// Lb 

export const useLbNavbarLinks = () => {  
    return [
      {
        name: "Home",
        hash: "/#accueil",
      },
      {
        name: "Services",
        hash: "/#services",
      },
      {
        name: "Why Us?",
        hash: "/#nous",
      },
      {
        name: "Contact",
        hash: "/#Contact",
      },
      {
        name: "ЛБ",
        hash: "/lb",
      }
    ];
  };

  //for the lb features
  export const uselbFeaturs= ()=>{
    return[
      {
        name:"Strong"
      },{
        name:"Long-Lasting"
      },{
        name:"Natural-Looking"
      }
    ]
  }