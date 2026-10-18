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
import SpotlightCard from './SpotlightCard';
import { allProjects, categories, projectGroups } from './data/projects';
import './styles.css';

const baseUrl = import.meta.env.BASE_URL;
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
  React.useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      try {
        const id = decodeURIComponent(window.location.hash.slice(1));
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
      } catch {
        // Leave malformed fragment identifiers untouched instead of breaking the page.
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  React.useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldPlayOpening = !reduceMotion && !window.location.hash && !hasPlayedOpening();

    const ctx = gsap.context(() => {
      if (shouldPlayOpening) {
        markOpeningPlayed();
        gsap.set(document.body, { overflow: 'hidden' });
        gsap.set('.siteHeader', { autoAlpha: 0, y: -96 });
        gsap.set('.heroBackground', { scale: 1.08 });
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
          .to('.heroBackground', { duration: 2.2, scale: 1, ease: 'power3.out' }, 0.22)
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
          .set(document.body, { clearProps: 'overflow' }, 2.2)
          .set('.openingLayer', { display: 'none' }, 2.35);
      } else {
        gsap.set('.openingLayer', { display: 'none' });
        gsap.set('.siteHeader', { autoAlpha: 1, y: 0 });
        gsap.set('.heroBackground', { scale: 1 });
        gsap.set('.heroTitle', {
          clipPath: 'inset(0 0% 0 0)',
          filter: 'blur(0px)',
          scaleX: 1,
          yPercent: 0,
        });
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
        <div className="staticBackdrop" aria-hidden="true" />
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
      <div className="heroBackground" aria-hidden="true" />
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
            <p className="heroTagline">Turning AI capability into usable products</p>
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
      <a className="brand resumeDownload" href={`${baseUrl}parth-resume.docx`} download>
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
    <section className="section about" id="about">
      <p className="sectionDisplayTitle">
        PROFILE
      </p>
      <div className="container aboutShowcase">
        <div className="aboutIntro">
          <p className="sectionKicker">README / PROFILE</p>
          <h2>个人经历</h2>
          <p>从地质训练、校园协作到现场服务。</p>
        </div>

        <div className="aboutFeature">
          <SpotlightCard className="aboutCard" spotlightColor="rgba(188, 168, 255, 0.22)">
            <div className="portraitPanel">
              <img
                src={`${baseUrl}profile-image.webp`}
                alt="Parth 个人形象"
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
                <a key={item.label} href={item.href}>
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
  const [activeCategory, setActiveCategory] = React.useState('全部');
  const activeProjects = activeCategory === '全部' ? allProjects : projectGroups[activeCategory];
  const isOverview = activeCategory === '全部';

  return (
    <section className="section projects" id="projects">
      <p className="sectionDisplayTitle">
        WORK
      </p>
      <div className="container projectShowcase">
        <div className="projectIntro">
          <p className="sectionKicker">SELECTED WORK</p>
          <h2>项目案例</h2>
          <p>按探索方向浏览项目案例，欢迎联系交流。</p>
        </div>
        <div className="projectFilters" aria-label="项目分类">
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
        <div className={isOverview ? 'projectFeature overviewGrid' : 'projectFeature'}>
          {activeProjects.map((project) => (
            <a
              className={isOverview ? 'projectCard featureCard compactProjectCard' : 'projectCard featureCard'}
              href={project.href ? `${baseUrl}${project.href}` : '#contact'}
              key={project.title}
            >
              <div className="projectImage">
                <img
                  src={`${baseUrl}${project.image}`}
                  alt={`${project.title}作品图片`}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="projectBody">
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <span className="projectLink">{project.href ? '查看详情 →' : '联系了解 →'}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="projectAbout">
          <div>
            <p className="sectionKicker">ABOUT</p>
            <h3>AI 产品方向，爱探索，也爱落地。</h3>
            <p>
              项目经历围绕 Agent 工作流、Coding Harness 和个人项目展开。能够快速理解需求，
              在用户场景、技术可行性和原型验证之间找到平衡，并持续借助 AI 辅助内容与产品创作。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <p className="sectionDisplayTitle">
        CAPABILITIES
      </p>
      <div className="container sectionHead compact">
        <p className="sectionKicker">CAPABILITIES</p>
        <h2>个人优势</h2>
      </div>
      <div className="container strengthGrid">
        {strengths.map((item) => {
          const Icon = item.icon;
          return (
            <article className="strengthCard" key={item.title}>
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
    <section className="contactEnd" id="contact">
      <p className="sectionDisplayTitle contactDisplayTitle">
        CONTACT
      </p>
      <div className="container contactEndInner">
        <p className="sectionKicker">
          CONTACT
        </p>
        <h2>期待参与下一段 AI 产品实践。</h2>
        <p>
          如果你正在寻找一位理解 Agent、愿意快速学习并能把需求推进成原型的 AI 产品实习生，欢迎联系我。
        </p>
        <div className="contactLine">
          <a href="mailto:3271408034@qq.com">
            3271408034@qq.com
          </a>
          <a href="tel:15064477280">
            15064477280
          </a>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
