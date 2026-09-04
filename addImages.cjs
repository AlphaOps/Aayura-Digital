const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data', 'programsData.js');
let data = fs.readFileSync(dataPath, 'utf8');

const imageMap = {
  "data-analytics-business-intelligence": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  "artificial-intelligence-machine-learning": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  "data-science-data-analytics": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800",
  "data-analysis-with-python": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
  "data-analysis-with-sql": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
  "mern-stack-developer": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
  "full-stack-web-developer": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  "python-full-stack-developer": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
  "java-full-stack-developer": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
  "java-developer": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=800",
  "python-programming": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
  "cloud-computing-devops": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  "cyber-security-ethical-hacking": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
  "android-app-development": "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800",
  "ui-ux-design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
  "web-designing": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
  "automobile-and-electric-vehicles": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
  "vlsi-designing": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  "next-gen-robotics-industrial-automation": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
  "drone-technology-uav-systems": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800",
  "uav-design-simulation": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
  "embedded-systems-internet-of-things": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  "mechanical-cad-design": "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800",
  "solidworks-mechanical-design": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  "autocad-mechanical-drafting": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  "catia-mechanical-design": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  "autocad-for-civil-engineering": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
  "bim-revit-structure": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  "bim-technology-digital-construction": "https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&q=80&w=800",
  "staad-pro-structural-analysis": "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&q=80&w=800",
  "construction-planning-project-management": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
};

// A regex to match id and insert image right after it
for (const [id, imageUrl] of Object.entries(imageMap)) {
  const regex = new RegExp(`"id":\\s*"${id}",`);
  data = data.replace(regex, `"id": "${id}",\n    "image": "${imageUrl}",`);
}

fs.writeFileSync(dataPath, data, 'utf8');
console.log('Images added to programsData.js');
