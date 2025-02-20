import {useTranslations} from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* 标题部分 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-foreground/80">{t('subtitle')}</p>
        </div>

        {/* 个人简介部分 */}
        <div className="space-y-6 bg-foreground/5 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">{t('greeting.title')}</h2>
          <p className="leading-relaxed">{t('greeting.description')}</p>
        </div>

        {/* 技术栈部分 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('techStack.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.raw('techStack.items').map((tech: string) => (
              <div
                key={tech}
                className="p-4 bg-foreground/5 rounded-lg text-center hover:bg-foreground/10 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* 学习目标部分 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('learningGoals.title')}</h2>
          <ul className="list-disc list-inside space-y-2 pl-4">
            {t.raw('learningGoals.items').map((goal: string) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </div>

        {/* 联系方式部分 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('contact.title')}</h2>
          <div className="flex gap-4 justify-center">
            <a
              href={t('contact.github.url')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
            >
              {t('contact.github.text')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 