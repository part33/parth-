import React from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Download,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Workflow,
} from 'lucide-react';
import Galaxy from './Galaxy';
import SpotlightCard from './SpotlightCard';
import './styles.css';

const openingStorageKey = 'parthPortfolioOpeningPlayed';

function hasPlayedOpening() {
  try {
    return window.sessionStorage.getItem(openingStorageKey) === 'true';
  } catch {
    return false;
  }
}

function markOpeningPlayed() {
  try {
    window.sessionStorage.setItem(openingStorageKey, 'true');
  } catch {
    // Storage can be unavailable in strict browser modes; the animation can still run normally.
  }
}

const contacts = [
  { label: 'Email', value: '3271408034@qq.com', href: 'mailto:3271408034@qq.com', icon: Mail },
  { label: 'Phone', value: '15064477280', href: 'tel:15064477280', icon: Phone },
  { label: 'Location', value: 'Guangdong / China', href: '#contact', icon: MapPin },
];

const experiences = [
  {
    period: '2023.09 - 至今',
    title: '广东石油化工学院',
    meta: '资源勘查工程 / 本科',
    body: '地质生，干一行爱一行，重事实流程，善系统拆解与资料整合。',
  },
  {
    period: '2024.09 - 2025.09',
    title: '模型协会干事',
    meta: '校园项目统筹',
    body: '参与筹办模型交流赛，负责线上作品征集、选手答疑、初审资料整理、老师审批对接，并联动各专业完成线下联展。',
  },
  {
    period: '2024.07 - 2024.08',
    title: '茂名市云智信息科技有限公司',
    meta: '助理',
    body: '协助办理现场业务，全流程跟进现场服务事项。',
  },
  {
    period: '2025.08 - 2025.09',
    title: '桂林县灌阳实习基地',
    meta: '学校实习',
    body: '完成地质野外露头记录、室内资料整理与作图，用结构化方式处理复杂现场信息。',
  },
];

const projects = [
  {
    tag: 'AIGC / Agent',
    title: 'Agent 应用基础能力搭建',
    desc: '通过 vibe-coding 搭建 Agent 应用项目雏形，关注任务拆解、上下文组织、工具调用与产品交互边界。',
    image: '/project-agent.svg',
  },
  {
    tag: 'Coding Harness',
    title: 'Coding Harness 工作流理解',
    desc: '围绕 Agent skills 编排、模型选型和 Token 成本控制，探索更稳定的 AI 辅助开发调度方式。',
    image: '/project-harness.svg',
  },
  {
    tag: 'Portfolio',
    title: '个人作品集网站',
    desc: '用 React + Vite 从零搭建可持续迭代的作品集，将个人经历、产品思维和 AI 项目实践转化为可展示界面。',
    image: '/project-portfolio.svg',
  },
];

const strengths = [
  {
    icon: BrainCircuit,
    title: 'AI 产品理解',
    text: '持续关注 AI 前沿，了解 Code Agent 框架、Harness 调度机制与 ReAct 推理范式。',
  },
  {
    icon: Workflow,
    title: 'Agent 工作流编排',
    text: '能围绕目标、工具、上下文和成本设计 Agent skills 流程，并关注 Token 使用效率。',
  },
  {
    icon: Code2,
    title: '基础全栈实现',
    text: '具备从需求到 MVP 的落地意识，能用基础工程能力把想法快速变成可验证原型。',
  },
  {
    icon: Sparkles,
    title: '产品迭代意识',
    text: '理解用户研究、需求拆解、支付集成、用户管理和产品迭代之间的连贯关系。',
  },
];

function App() {
  const [galaxyReady, setGalaxyReady] = React.useState(false);

  React.useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldPlayOpening = !reduceMotion && !hasPlayedOpening();

    const ctx = gsap.context(() => {
      if (shouldPlayOpening) {
        markOpeningPlayed();
        gsap.set(document.body, { overflow: 'hidden' });
        gsap.set('.siteHeader', { autoAlpha: 0, y: -96 });
        gsap.set('.heroVideo', { scale: 1.08 });
        gsap.set('.heroTitle', {
          clipPath: 'inset(0 100% 0 0)',
          filter: 'blur(10px)',
          scaleX: 0.72,
          transformOrigin: 'left center',
          yPercent: 42,
        });
        gsap.set('.heroActions a', { clipPath: 'inset(0 100% 0 0)', x: -28 });
        gsap.set('.heroReadmeBlock span, .heroTagline, .heroMeta span', {
          clipPath: 'inset(0 0 100% 0)',
          y: 44,
        });

        const opening = gsap.timeline({ defaults: { ease: 'expo.out' } });

        opening
          .to('.openingRule', { duration: 0.95, scaleX: 1, ease: 'power4.inOut' })
          .to('.openingWord', { duration: 1.05, clipPath: 'inset(0 0% 0 0)', y: 0 }, 0.18)
          .to('.heroVideo', { duration: 2.2, scale: 1, ease: 'power3.out' }, 0.22)
          .to(
            '.heroTitle',
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.75,
              filter: 'blur(0px)',
              scaleX: 1,
              yPercent: 0,
            },
            0.62,
          )
          .to('.openingPanel.top', { duration: 1.2, ease: 'power4.inOut', yPercent: -100 }, 0.82)
          .to('.openingPanel.bottom', { duration: 1.2, ease: 'power4.inOut', yPercent: 100 }, 0.82)
          .to('.siteHeader', { autoAlpha: 1, duration: 1.1, y: 0 }, 1.32)
          .to(
            '.heroActions a',
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.05,
              stagger: 0.12,
              x: 0,
            },
            1.46,
          )
          .to(
            '.heroReadmeBlock span, .heroTagline, .heroMeta span',
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.12,
              stagger: 0.08,
              y: 0,
            },
            1.56,
          )
          .call(() => setGalaxyReady(true), [], 2.05)
          .set(document.body, { clearProps: 'overflow' }, 2.2)
          .set('.openingLayer', { display: 'none' }, 2.35);
      } else {
        document.querySelector('.openingLayer')?.remove();
        gsap.set('.siteHeader', { autoAlpha: 1, y: 0 });
        gsap.set('.heroVideo', { scale: 1 });
        gsap.set('.heroTitle', {
          clipPath: 'inset(0 0% 0 0)',
          filter: 'blur(0px)',
          scaleX: 1,
          yPercent: 0,
        });
        setGalaxyReady(true);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <div className="openingLayer" aria-hidden="true">
        <div className="openingPanel top">
          <span className="openingWord">PARTH</span>
          <span className="openingRule" />
        </div>
        <div className="openingPanel bottom" />
      </div>
      <Header />
      <Hero />
      <div className="belowHero">
        <div className="galaxyBackdrop" aria-hidden="true">
          {galaxyReady ? (
            <Galaxy
              mouseInteraction={false}
              density={1.2}
              fps={28}
              glowIntensity={0.36}
              maxDpr={1.15}
              pauseWhenOffscreen
              saturation={0.18}
              hueShift={245}
              speed={0.42}
              twinkleIntensity={0.3}
              rotationSpeed={0.02}
            />
          ) : null}
        </div>
        <Projects />
        <About />
        <Strengths />
        <ContactEnd />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <video
        className="heroVideo"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/hero-background.optimized.mp4" type="video/mp4" />
      </video>
      <div className="heroShade" />
      <div className="container heroFrame minimalHero">
        <div className="heroInner">
          <h1 className="heroTitle">Parth</h1>
        </div>
        <div className="heroBottom">
          <div className="heroActions">
            <a className="primaryButton" href="#about">
              开始查看
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
            <a className="ghostButton" href="mailto:3271408034@qq.com">
              3271408034@qq.com
            </a>
          </div>
          <div className="heroReadmeBlock">
            <span>README</span>
            <p className="heroTagline">把 AI 能力组织成可用产品</p>
          </div>
        </div>
      </div>
      <div className="heroMeta">
        <span>Parth</span>
        <span>Guangdong, China</span>
        <span>Available for AI Product Internship</span>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="siteHeader">
      <a className="brand resumeDownload" href="/parth-resume.docx" download>
        <Download size={17} strokeWidth={1.8} />
        <span>下载简历</span>
      </a>
      <nav>
        <a href="#projects">项目</a>
        <a href="#about">经历</a>
        <a href="#strengths">优势</a>
        <a href="#contact">联系</a>
      </nav>
      <a className="contactButton" href="mailto:3271408034@qq.com">
        <Mail size={17} strokeWidth={1.8} />
        <span>联系</span>
      </a>
    </header>
  );
}

function About() {
  return (
    <section className="section about" data-motion-section id="about">
      <p className="sectionDisplayTitle" data-motion-title>
        PROFILE
      </p>
      <div className="container aboutShowcase">
        <div className="aboutIntro" data-motion-copy>
          <p className="sectionKicker">README / PROFILE</p>
          <h2>个人经历</h2>
          <p>从地质训练、校园协作到现场服务。</p>
        </div>

        <div className="aboutFeature">
          <SpotlightCard className="aboutCard" data-motion-card spotlightColor="rgba(188, 168, 255, 0.22)">
            <div className="portraitPanel" data-image-frame>
              <img
                src="/profile-image.webp"
                alt="Parth 个人形象"
                data-parallax-image
                decoding="async"
                loading="lazy"
              />
            </div>
            <div className="aboutCardBody">
              <span>PROFILE</span>
              <div className="aboutInfoList">
                <p>
                  <strong>年龄：</strong>
                  22
                </p>
                <p>
                  <strong>年级：</strong>
                  大三
                </p>
                <p>
                  <strong>求职方向：</strong>
                  AI 产品 / Agent 开发
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        <div className="aboutStats">
          <div className="contactGrid" aria-label="联系方式">
            {contacts.map((item) => {
              const Icon = item.icon;
              return (
                <a data-motion-card key={item.label} href={item.href}>
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
              );
            })}
          </div>
          <div className="aboutMeta">
            {experiences.map((item) => (
              <SpotlightCard
                key={`${item.period}-${item.title}`}
                className="timelineItem"
                data-motion-card
                spotlightColor="rgba(188, 168, 255, 0.2)"
              >
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p className="timelineMeta">{item.meta}</p>
                <p>{item.body}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeCategory, setActiveCategory] = React.useState('Harness');
  const categories = ['全部', 'skill', 'rag', 'AIGC', 'Harness', '产品原型'];
  const projectGroups = {
    全部: [
      {
        tag: 'AIGC / Agent',
        title: 'Agent 应用项目',
        desc: '用任务拆解、上下文组织和工具调用，把模型能力整理成可以被用户理解和操作的产品流程。',
        image: '/project-agent.svg',
      },
      {
        tag: 'Coding Harness',
        title: 'Harness 工作流研究',
        desc: '围绕模型调用、上下文管理和成本控制，梳理 AI 辅助开发中的稳定协作方式。',
        image: '/project-harness.svg',
      },
    ],
    skill: [
      {
        tag: 'Design Preflight / Skill',
        title: '设计前置工作流',
        desc: '为 Codex 设计中文工作流 skill，在编码前完成需求澄清、方案比较、范围拆分与设计输出。',
        image: '/project-design-preflight.svg',
        href: '/she-ji-qian-zhi/portfolio-case-study.html',
      },
      {
        tag: 'Prompt / Ops',
        title: '提示词调试流程',
        desc: '通过目标定义、样例校准和结果复盘，让模型输出更稳定地贴近产品需求。',
        image: '/project-agent.svg',
      },
    ],
    rag: [
      {
        tag: 'RAG / Knowledge Base',
        title: 'RAG 知识库问答',
        desc: '围绕文档切分、向量检索和回答生成，梳理可用于业务问答的基础流程。',
        image: '/project-portfolio.svg',
      },
    ],
    AIGC: [
      {
        tag: 'AIGC / Content',
        title: 'AIGC 内容工作流',
        desc: '用模型辅助资料整理、内容生成和版本迭代，提高从想法到成稿的推进效率。',
        image: '/project-agent.svg',
      },
    ],
    Harness: [
      {
        tag: 'AI Product Manager Workflow',
        title: 'PM Harness 案例研究',
        desc: '把模糊想法转成可交接产品文档，包含阶段路由、范围控制、独立评审和决策留痕。',
        image: '/project-harness.svg',
        href: '/pm-harness/index.html',
      },
      {
        tag: 'Article Harness / Workflow',
        title: '文章生成流水线',
        desc: '把零散素材整理成 Markdown 主稿，再渲染为可分享 HTML，并通过规划、审查和修补控制内容质量。',
        image: '/project-article-pipeline.svg',
        href: '/article-pipeline/index.html',
      },
    ],
    产品原型: [
      {
        tag: 'Prototype / React',
        title: '个人作品集网站',
        desc: '用 React + Vite 搭建可持续迭代的作品集，把经历、项目和能力组织成展示界面。',
        image: '/project-portfolio.svg',
      },
      {
        tag: 'Prototype / AI',
        title: 'AI 功能原型',
        desc: '快速搭建交互样稿，用低成本方式验证需求表达、页面结构和关键流程。',
        image: '/project-agent.svg',
      },
    ],
  };
  const activeProjects = projectGroups[activeCategory] ?? projectGroups.全部;
  const stats = [
    { label: '项目类型', value: '06' },
    { label: '核心方向', value: 'AI' },
    { label: '工具协作', value: 'Agent' },
  ];

  return (
    <section className="section projects" data-motion-section id="projects">
      <p className="sectionDisplayTitle" data-motion-title>
        WORK
      </p>
      <div className="container projectShowcase">
        <div className="projectIntro" data-motion-copy>
          <p className="sectionKicker">SELECTED WORK</p>
          <h2>项目案例</h2>
          <p>作品按探索方向整理，点击卡片可以查看该分类下的项目内容。</p>
        </div>
        <div className="projectFilters" aria-label="项目分类" data-motion-copy>
          {categories.map((category) => (
            <button
              aria-pressed={category === activeCategory}
              className={category === activeCategory ? 'isActive' : ''}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="projectFeature">
          {activeProjects.map((project) => (
            <a
              className="projectCard featureCard"
              href={project.href ?? '#contact'}
              key={`${activeCategory}-${project.title}`}
              rel={project.href?.startsWith('http') ? 'noreferrer' : undefined}
              target={project.href?.startsWith('http') ? '_blank' : undefined}
            >
              <div className="projectImage" data-image-frame>
                <img
                  src={project.image}
                  alt={`${project.title}作品图片`}
                  data-project-parallax
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="projectBody">
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <span className="projectLink">查看详情 -&gt;</span>
              </div>
            </a>
          ))}
        </div>
        <div className="projectAbout" data-motion-card>
          <div>
            <p className="sectionKicker">ABOUT</p>
            <h3>AI 产品方向，爱探索，也爱落地。</h3>
            <p>
              项目经历围绕 AIGC、Agent 工作流、Coding Harness 和个人网站展开。能够快速理解需求，
              在用户场景、技术可行性和原型验证之间找到平衡，并持续借助 AI 辅助内容与产品创作。
            </p>
          </div>
          <div className="projectStats">
            {stats.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths" data-motion-section id="strengths">
      <p className="sectionDisplayTitle" data-motion-title>
        CAPABILITIES
      </p>
      <div className="container sectionHead compact" data-motion-copy>
        <p className="sectionKicker">CAPABILITIES</p>
        <h2>个人优势</h2>
      </div>
      <div className="container strengthGrid">
        {strengths.map((item) => {
          const Icon = item.icon;
          return (
            <article className="strengthCard" data-motion-card key={item.title}>
              <div className="iconBox">
                <Icon size={24} strokeWidth={1.7} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ContactEnd() {
  return (
    <section className="contactEnd" data-motion-section id="contact">
      <p className="sectionDisplayTitle contactDisplayTitle" data-motion-title>
        CONTACT
      </p>
      <div className="container contactEndInner">
        <p className="sectionKicker" data-motion-copy>
          CONTACT
        </p>
        <h2 data-motion-copy>期待参与下一段 AI 产品实践。</h2>
        <p data-motion-copy>
          如果你正在寻找一位理解 Agent、愿意快速学习并能把需求推进成原型的 AI 产品实习生，欢迎联系我。
        </p>
        <div className="contactLine">
          <a data-motion-card href="mailto:3271408034@qq.com">
            3271408034@qq.com
          </a>
          <a data-motion-card href="tel:15064477280">
            15064477280
          </a>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
