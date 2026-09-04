import React from 'react';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import './ProjectShowcase.css';

export const ProjectShowcase = () => {
  const projects = [
    {
      category: 'AI Video Advertisement',
      title: 'NextGen Product Launch',
      skills: ['Runway Gen-2', 'Midjourney', 'Premiere Pro'],
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
    },
    {
      category: 'Meta Ads Campaign Strategy',
      title: 'E-commerce Growth Engine',
      skills: ['Facebook Ads', 'A/B Testing', 'ROAS Optimization'],
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
    },
    {
      category: 'Social Media Content Plan',
      title: 'Brand Refresh: Urban Lifestyle',
      skills: ['Instagram Strategy', 'Canva', 'Copywriting'],
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop'
    },
    {
      category: 'Brand Marketing Campaign',
      title: 'Sustainable Future Initiative',
      skills: ['Brand Strategy', 'Analytics', 'Content Creation'],
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop'
    },
    {
      category: 'AI Automation Workflow',
      title: 'Automated Lead Nurturing',
      skills: ['Zapier', 'ChatGPT API', 'CRM Integration'],
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
    },
    {
      category: 'Website Design',
      title: 'Modern Portfolio Redesign',
      skills: ['Figma', 'UI/UX', 'Wireframing'],
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <Section id="projects" variant="primary" className="projects-section">
      <SectionHeading 
        subtitle="BUILT BY OUR LEARNERS" 
        title={<>Don't Just Tell People What You Learned.<br/>Show Them.</>} 
        centered={true}
      />

      <div className="projects-grid">
        {projects.filter((project, idx, self) => idx === self.findIndex((t) => t.title === project.title)).map((project, idx) => (
          <div key={idx} className="project-card">
            <div className="project-thumbnail">
              <img src={project.thumbnail} alt={project.title} />
              <div className="project-overlay">
                <Button variant="primary" size="sm">View Project</Button>
              </div>
            </div>
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <div className="project-skills">
                {[...new Set(project.skills)].map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-xl">
        <Button variant="outline" size="lg">Explore More Projects</Button>
      </div>
    </Section>
  );
};
