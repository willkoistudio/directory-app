import { useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { Card } from "../../components/ui/card";
import {
  Building2,
  MapPinHouse,
  NotebookPen,
  Pencil,
  PhoneCall,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Contact } from "../../models/contact";

const contactDetail: Contact = {
  id: "3c23d152",
  name: "Will Smirs",
  companyId: "0",
  email: "shanna@yahoo.com",
  phone: "010-692-6593 x09125",
  workPhone: "1-463-123-3447",
  fax: "1-463-123-3447",
  function: "Chief Executive Officer",
  website: "www.hildegard.org",
  address: {
    street: "1 GNX Drive",
    city: "Oakland",
    postalCode: "12345",
    country: "Canada",
  },
  notes:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis architecto recusandae distinctio quas! Recusandae soluta nostrum assumenda quis nobis dolores accusamus eius alias harum quae, rem delectus nulla quisquam tempore.",
  keywords: ["keyword1", "keyword2", "keyword3"],
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ContactDetail: React.FC = () => {
  const { setPageName } = usePageName();
  const navigate = useNavigate();

  useEffect(() => {
    setPageName(ROUTE_NAMES.CONTACT_DETAIL); // Mettre à jour le nom de la page
  }, []);

  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between mt-12">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to search page
        </Button>
        <Button className="bg-red" onClick={() => setEditMode(!editMode)}>
          <Pencil /> Edit contact
        </Button>
      </nav>
      <section className="mt-8 mb-12 grid grid-cols-2 gap-8">
        <Card className="px-8 py-8 border-white/20">
          <div className="flex gap-4 items-center">
            <div className="rounded-full overflow-hidden">
              <img
                src={contactDetail.avatar}
                alt={contactDetail.name}
                width="100px"
              />
            </div>
            <div>
              <p className="text-2xl font-bold">{contactDetail.name}</p>
              <p className="text-gray">{contactDetail.email}</p>
            </div>
            <div className="border-l border-gray pl-4">
              <p className="pb-1">Keywords</p>
              <div className="flex gap-2">
                {contactDetail.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <div className="border-r border-gray pr-4">
              <p>Job title</p>
              <p className="text-gray">CEO</p>
            </div>
            <div className="border-r border-gray pr-4">
              <p>Website</p>
              <p className="text-gray">{contactDetail.website}</p>
            </div>
            <div className="border-r border-gray pr-4">
              <p>Country</p>
              <p className="text-gray">{contactDetail.address.country} 🇺🇸</p>
            </div>
            <div>
              <p>Date created</p>
              <p className="text-gray">Jan. 9, 2023</p>
            </div>
          </div>
          <div className="flex mt-8">
            <p className="ml-auto mr-0 text-sm text-gray">
              Updated: Dec. 13, 2024
            </p>
          </div>
        </Card>
        <Card className="px-8 py-8 border-white/20">
          <div className="flex justify-between">
            <p className="text-2xl font-bold flex items-center">
              <Building2 className="mr-2" /> <span>Company infos</span>
            </p>
            <Button
              className="bg-gray"
              onClick={() => navigate(`company/${contactDetail.companyId}`)}
            >
              <SquareArrowOutUpRight /> View details
            </Button>
          </div>
          <div className="grid gap-4 mt-8 grid-cols-2">
            <div>
              <div className="mb-2">
                <p>Name</p>
                <p className="text-gray">Apple</p>
              </div>
              <div className="mb-2">
                <p>Area</p>
                <p className="text-gray">Technology</p>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <p>Phone</p>
                <p className="text-gray">+1 234 567 89</p>
              </div>
              <div className="mb-2">
                <p>Country</p>
                <p className="text-gray">Hildegard Group</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="px-8 py-8 border-white/20">
          <p className="text-2xl font-bold flex items-center">
            <PhoneCall className="mr-2" /> <span>Telephone</span>
          </p>
          <div className="flex gap-4 mt-8">
            <div className="border-r border-gray pr-4">
              <p>Phone</p>
              <p className="text-gray">{contactDetail.phone}</p>
            </div>
            <div className="border-r border-gray pr-4">
              <p>Work Phone</p>
              <p className="text-gray">{contactDetail.workPhone}</p>
            </div>
            <div>
              <p>Fax</p>
              <p className="text-gray">{contactDetail.fax}</p>
            </div>
          </div>
        </Card>
        <Card className="px-8 py-8 border-white/20">
          <p className="text-2xl font-bold flex items-center">
            <MapPinHouse className="mr-2" /> <span>Address</span>
          </p>
          <div className="grid gap-4 grid-cols-2 mt-8">
            <div className="mb-2">
              <p>Street</p>
              <p className="text-gray">{contactDetail.address.street}</p>
            </div>
            <div className="mb-2">
              <p>City</p>
              <p className="text-gray">{contactDetail.address.city}</p>
            </div>
            <div className="mb-2">
              <p>Postal Code</p>
              <p className="text-gray">{contactDetail.address.postalCode}</p>
            </div>
            <div className="mb-2">
              <p>Country</p>
              <p className="text-gray">{contactDetail.address.country}</p>
            </div>
          </div>
        </Card>
        <Card className="px-8 py-8 border-white/20">
          <p className="text-2xl font-bold flex items-center mb-4">
            <NotebookPen className="mr-2" /> <span>Notes</span>
          </p>
          <p className="border-l-4 border-gray pl-4">{contactDetail.notes}</p>
        </Card>
      </section>
    </>
  );
};

export { ContactDetail };
