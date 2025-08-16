'use client';
import { useState } from 'react';

const toolIcons = [
  { src: '/tools/appium.svg', alt: 'Appium' },
  { src: '/tools/playwright.svg', alt: 'Playwright' },
  { src: '/tools/selenium.svg', alt: 'Selenium' },
  { src: '/tools/cypress.svg', alt: 'Cypress' },
  { src: '/tools/postman.svg', alt: 'Postman' },
  { src: '/tools/karatelabs.svg', alt: 'Karate' },
  { src: '/tools/jest.svg', alt: 'Jest' },
  { src: '/tools/jmeter.svg', alt: 'Jmeter' },
  { src: '/tools/k6.svg', alt: 'K6' },
  { src: '/tools/typescript.svg', alt: 'TypeScript' },
  { src: '/tools/python.svg', alt: 'Python' },
  { src: '/tools/java.svg', alt: 'Java' },
  { src: '/tools/csharp.svg', alt: 'C#' },
  { src: '/tools/aws.svg', alt: 'AWS' },
  { src: '/tools/jenkins.svg', alt: 'Jenkins' },
  { src: '/tools/githubactions.svg', alt: 'GitHub Actions' },
  { src: '/tools/git.svg', alt: 'Git' },
  { src: '/tools/github.svg', alt: 'GitHub' },
  { src: '/tools/gitlab.svg', alt: 'GitLab' },
  { src: '/tools/bitbucket.svg', alt: 'BitBucket' },
  { src: '/tools/sonarqube.svg', alt: 'SonarQube' },
  { src: '/tools/intellij-idea.svg', alt: 'IntelliJ IDEA' },
  { src: '/tools/jetbrains-pycharm.svg', alt: 'PyCharm' },
  { src: '/tools/webstorm.svg', alt: 'WebStorm' },
  { src: '/tools/visualstudio.svg', alt: 'Visual Studio' },
  { src: '/tools/vscode.svg', alt: 'VS Code' },
];

const ToolIcon = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="flex-shrink-0 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center group hover:border-primary hover:shadow-lg transition-all duration-300">
        <span className="text-xs font-medium text-muted-foreground group-hover:text-primary text-center px-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center p-3 group hover:border-primary hover:shadow-lg hover:scale-110 transition-all duration-300">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
        onError={handleError}
      />
    </div>
  );
};

export default function ToolsCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  const mid = Math.ceil(toolIcons.length / 2);
  const firstRow = [...toolIcons.slice(0, mid), ...toolIcons.slice(0, mid)];
  const secondRow = [...toolIcons.slice(mid), ...toolIcons.slice(mid)];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
      {[firstRow, secondRow].map((rowTools, row) => (
        <div key={row} className="relative overflow-hidden w-full">
          <div
            className="flex gap-6 animate-scroll-right w-max"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {rowTools.map((tool, index) => (
              <ToolIcon key={`${tool.alt}-${row}-${index}`} src={tool.src} alt={tool.alt} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
