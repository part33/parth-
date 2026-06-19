const categories = ['全部', 'skill', 'rag', 'AIGC', 'Harness', '产品原型'];

const projectGroups = {
  全部: [
    {
      tag: 'AIGC / Agent',
      title: 'Agent 应用项目',
      desc: '用任务拆解、上下文组织和工具调用，把模型能力整理成可以被用户理解和操作的产品流程。',
      image: 'project-agent.svg',
    },
    {
      tag: 'Coding Harness',
      title: 'Harness 工作流研究',
      desc: '围绕模型调用、上下文管理和成本控制，梳理 AI 辅助开发中的稳定协作方式。',
      image: 'project-harness.svg',
    },
  ],
  skill: [
    {
      tag: 'Design Preflight / Skill',
      title: '设计前置工作流',
      desc: '为 Codex 设计中文工作流 skill，在编码前完成需求澄清、方案比较、范围拆分与设计输出。',
      image: 'project-design-preflight.svg',
      href: 'she-ji-qian-zhi/portfolio-case-study.html',
    },
    {
      tag: 'Prompt / Ops',
      title: '提示词调试流程',
      desc: '通过目标定义、样例校准和结果复盘，让模型输出更稳定地贴近产品需求。',
      image: 'project-agent.svg',
    },
  ],
  rag: [
    {
      tag: 'RAG / Knowledge Base',
      title: 'RAG 知识库问答',
      desc: '围绕文档切分、向量检索和回答生成，梳理可用于业务问答的基础流程。',
      image: 'project-portfolio.svg',
    },
  ],
  AIGC: [
    {
      tag: 'AIGC / Content',
      title: 'AIGC 内容工作流',
      desc: '用模型辅助资料整理、内容生成和版本迭代，提高从想法到成稿的推进效率。',
      image: 'project-agent.svg',
    },
  ],
  Harness: [
    {
      tag: 'AI Product Manager Workflow',
      title: 'PM Harness 案例研究',
      desc: '把模糊想法转成可交接产品文档，包含阶段路由、范围控制、独立评审和决策留痕。',
      image: 'project-harness.svg',
      href: 'pm-harness/index.html',
    },
    {
      tag: 'Article Harness / Workflow',
      title: '文章生成流水线',
      desc: '把零散素材整理成 Markdown 主稿，再渲染为可分享 HTML，并通过规划、审查和修补控制内容质量。',
      image: 'project-article-pipeline.svg',
      href: 'article-pipeline/index.html',
    },
  ],
  产品原型: [
    {
      tag: 'Prototype / React',
      title: '个人作品集网站',
      desc: '用 React + Vite 搭建可持续迭代的作品集，把经历、项目和能力组织成展示界面。',
      image: 'project-portfolio.svg',
    },
    {
      tag: 'Prototype / AI',
      title: 'AI 功能原型',
      desc: '快速搭建交互样稿，用低成本方式验证需求表达、页面结构和关键流程。',
      image: 'project-agent.svg',
    },
  ],
};

const filters = document.querySelector('#projectFilters');
const grid = document.querySelector('#projectGrid');
let activeCategory = 'Harness';

function renderFilters() {
  filters.innerHTML = categories
    .map((category) => {
      const active = category === activeCategory ? ' class="is-active"' : '';
      return `<button type="button"${active} data-category="${category}">${category}</button>`;
    })
    .join('');
}

function renderProjects() {
  const projects = projectGroups[activeCategory] ?? projectGroups.全部;
  grid.innerHTML = projects
    .map((project) => {
      const href = project.href ?? '#contact';
      return `
        <a class="project-card" href="${href}">
          <img src="${project.image}" alt="${project.title}作品图片" loading="lazy" />
          <div class="project-body">
            <span>${project.tag}</span>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <span class="project-link">查看详情 -></span>
          </div>
        </a>
      `;
    })
    .join('');
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderProjects();
});

renderFilters();
renderProjects();
