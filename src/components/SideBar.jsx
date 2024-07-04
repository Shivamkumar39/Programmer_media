/* components/SideBar.js */
import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";

const SideBar = () => {
  const [open, setOpen] = useState(0);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [openPlatforms, setOpenPlatforms] = useState(false);
  const [openFrameworks, setOpenFrameworks] = useState(false);

  const handleOpen = (value) => {
    setOpen(value === open ? 0 : value);
    // Close all nested accordions when opening a top-level accordion
    setOpenLanguages(false);
    setOpenPlatforms(false);
    setOpenFrameworks(false);
  };

  const handleNestedOpen = (accordionName) => {
    switch (accordionName) {
      case 'languages':
        setOpenLanguages(!openLanguages);
        break;
      case 'platforms':
        setOpenPlatforms(!openPlatforms);
        break;
      case 'frameworks':
        setOpenFrameworks(!openFrameworks);
        break;
      default:
        break;
    }
  };

  const softwareLists = {
    programmingLanguages: [
      'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Swift', 'Kotlin', 'PHP'
    ],
    programmingPlatforms: [
      'Node.js', 'Django', 'Spring', 'Flask', 'ASP.NET', 'Laravel', 'Ruby on Rails', 'React Native', 'Flutter', 'Xamarin'
    ],
    frameworksLibraries: [
      'React', 'Angular', 'Vue', 'Svelte', 'Ember', 'Backbone', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Foundation'
    ]
  };

  const renderList = (items) => (
    items.map((item, index) => (
      <ListItem key={index}>
        <ListItemPrefix>
          <Checkbox />
        </ListItemPrefix>
        {item}
      </ListItem>
    ))
  );

  return (
    <Card className="h-full w-[25%] shadow-xl shadow-blue-gray-900/5 hidden md:block md:ml-6 overflow-y-scroll">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List className=' max-w-[100%] min-w-[100%]'>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Software 
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <Accordion
              open={openLanguages}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${openLanguages ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={openLanguages}>
                <AccordionHeader onClick={() => handleNestedOpen('languages')} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Programming Languages
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  {renderList(softwareLists.programmingLanguages)}
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openPlatforms}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${openPlatforms ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={openPlatforms}>
                <AccordionHeader onClick={() => handleNestedOpen('platforms')} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Programming Platforms
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  {renderList(softwareLists.programmingPlatforms)}
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openFrameworks}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${openFrameworks ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className="p-0" selected={openFrameworks}>
                <AccordionHeader onClick={() => handleNestedOpen('frameworks')} className="border-b-0 p-3">
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Frameworks/Libraries
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  {renderList(softwareLists.frameworksLibraries)}
                </List>
              </AccordionBody>
            </Accordion>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Account
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Orders
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
    </Card>
  );
};

export default SideBar;
