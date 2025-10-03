import { Stack, Typography } from '@mui/material';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-slate-contrast">
      <div className="mx-auto flex w-full max-w-[var(--app-max-width)] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <Stack direction="row" spacing={3} alignItems="center">
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em]">
            <span className="text-electric">{'{'}</span>
            <span>JZ</span>
            <span className="text-purple">{'}'}</span>
          </div>
          <Typography variant="body2">© {year} Julio Zeledón. All rights reserved.</Typography>
        </Stack>

        <Stack direction="row" spacing={4} className="text-sm">
          <a href="#about" className="transition-colors hover:text-electric">
            About
          </a>
          <a href="#skills" className="transition-colors hover:text-electric">
            Skills
          </a>
          <a href="#experience" className="transition-colors hover:text-electric">
            Experience
          </a>
          <a href="#contact" className="transition-colors hover:text-electric">
            Contact
          </a>
        </Stack>

        <Stack direction="row" spacing={2}>
          <a
            href="https://github.com/julzeldev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:-translate-y-0.5 hover:text-electric"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/julio-zeledón-069659a0"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:-translate-y-0.5 hover:text-electric"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
        </Stack>
      </div>
    </footer>
  );
};

export default Footer;
