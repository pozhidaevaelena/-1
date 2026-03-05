/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { generateHeroImage } from "./services/imageService";
import { Sparkles, Zap, Target, Layers, ArrowRight, MessageCircle, CheckCircle2, MessageSquare, Cpu, Send, X } from "lucide-react";

const TELEGRAM_LINK = "#";

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-24 md:py-32 px-6 max-w-7xl mx-auto relative z-10 ${className}`}>
    {children}
  </section>
);

const GlassCard = ({ title, icon: Icon, children, delay = 0 }: { title: string; icon: any; children: React.ReactNode; delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="glass-card p-8 group bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl"
  >
    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-blue-400 w-6 h-6" />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
    <p className="text-white/60 leading-relaxed text-lg">{children}</p>
  </motion.div>
);

interface PortfolioItem {
  tag: string;
  title: string;
  text: string;
  fullText: string;
}

export default function App() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function loadImage() {
      try {
        const img = await generateHeroImage();
        if (img) {
          setHeroImage(img);
        } else {
          setHeroImage("https://picsum.photos/seed/ai-workspace/1000/1000");
        }
      } catch (error) {
        console.error("Failed to generate image:", error);
        setHeroImage("https://picsum.photos/seed/ai-workspace/1000/1000");
      } finally {
        setLoadingImage(false);
      }
    }
    loadImage();
  }, []);

  const portfolioItems: PortfolioItem[] = [
    { 
      tag: "Лайфстайл", 
      title: "Пост для кофейни", 
      text: "«Осень пришла не только в город, но и в наше меню. Тыквенный латте уже ждёт тебя...»",
      fullText: "Осень пришла не только в город, но и в наше меню. Тыквенный латте уже ждёт тебя, согревая не хуже пледа. А к нему — свежайший круассан с миндалём. Забегай за своей порцией уюта на Ленина, 15. Работаем до последнего гостя!"
    },
    { 
      tag: "Экспертный", 
      title: "Пост для психолога", 
      text: "«Усталость — это не всегда про работу. Иногда это про то, что мы слишком долго несём груз...»",
      fullText: "Усталость — это не всегда про работу. Иногда это про то, что мы слишком долго несём груз чужих ожиданий. Давай сегодня просто выдохнем. Разреши себе быть неидеальным, отложи дела на 15 минут и просто послушай тишину. Твоё ментальное здоровье важнее любого дедлайна."
    },
    { 
      tag: "Видео / Reels", 
      title: "Сценарий для Reels", 
      text: "«Кадр 1: будильник. Кадр 2: лениво тянется. Кадр 3: резко встаёт. Текст: «Утро без геройства...»",
      fullText: "Кадр 1: Крупный план будильника, рука лениво его выключает. Кадр 2: Человек под одеялом, пытается проснуться. Кадр 3: Резкий переход — человек уже в кроссовках у двери. Текст на экране: «Утро без геройства. Просто движение ради себя. Тренировки по расписанию — ссылка в описании профиля». Музыка: Энергичный бит."
    },
    { 
      tag: "Продающий", 
      title: "Продающий пост", 
      text: "«Перестань ждать понедельника. Начни сегодня. Запишись на бесплатную диагностику и узнай...»",
      fullText: "Перестань ждать понедельника. Начни сегодня. Запишись на бесплатную диагностику и узнай, как удвоить доход за 3 месяца без выгорания. Мы разберем твою текущую ситуацию, найдем точки роста и составим пошаговый план. Мест всего 3 на этой неделе. Пиши в директ «ХОЧУ»!"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-blue-500/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-100" />
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-xl bg-white/5 border border-white/10 px-6 py-3 rounded-full shadow-2xl">
          <div className="text-xl font-display font-bold text-white tracking-tighter flex items-center gap-2">
            <Sparkles className="text-blue-400 w-5 h-5" />
            AI CONTENT PRO
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
            <a href="#advantages" className="hover:text-white transition-colors">Преимущества</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Портфолио</a>
            <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
          </div>
          <a href={TELEGRAM_LINK} className="text-sm font-semibold bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
            Связаться
          </a>
        </div>
      </nav>

      {/* Block 1: Hero */}
      <Section className="pt-40 md:pt-56 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-8">
            <Zap className="w-4 h-4 fill-current" />
            Будущее копирайтинга уже здесь
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-gradient">
            Контент, который <span className="text-blue-400">продает</span>.
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-10 leading-relaxed max-w-xl">
            Созданный нейросетью, доведённый до совершенства человеком. Скорость света, креативность машины и 100% контроль качества.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={TELEGRAM_LINK} className="btn-premium text-lg flex items-center justify-center gap-2 text-center">
              Заказать консультацию <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/15 transition-colors duration-700" />
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
            <AnimatePresence mode="wait">
              {loadingImage ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-900/50 backdrop-blur-xl"
                >
                  <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
                  <p className="text-sm font-medium text-white/40">Генерация шедевра...</p>
                </motion.div>
              ) : heroImage ? (
                <motion.img 
                  key="image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={heroImage}
                  alt="AI Creativity"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                  <p className="text-white/40">Image failed to load</p>
                </div>
              )}
            </AnimatePresence>
          </div>
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl"
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Статус</p>
              <p className="text-sm font-semibold text-white">100% Качество</p>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Block 2: Advantages */}
      <Section id="advantages">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Почему я?</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Сочетание технологий и опыта дает результат, недоступный обычным копирайтерам.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard title="Скорость" icon={Zap} delay={0.1}>
            Пост за 15 минут. Пока вы пьете кофе, ИИ генерирует базу, а я превращаю её в готовый продукт.
          </GlassCard>
          <GlassCard title="Уникальность" icon={Target} delay={0.2}>
            Мозг нейросети + мой опыт. Мы выбираем лучшие из 100 идей и адаптируем их под ваш бренд.
          </GlassCard>
          <GlassCard title="Адаптивность" icon={Layers} delay={0.3}>
            Один запрос — 5 форматов. От Reels до лонгридов. Контент, который работает везде.
          </GlassCard>
        </div>
      </Section>

      {/* Block 3: Portfolio */}
      <Section id="portfolio" className="bg-white/5 border-y border-white/10 backdrop-blur-sm">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">Портфолио</h2>
          <p className="text-xl text-white/60">Тексты, которые уже приносят результат клиентам.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedItem(item)}
              className="glass-card p-10 group cursor-pointer bg-white/5 backdrop-blur-xl border-white/10"
            >
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 block">{item.tag}</span>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-blue-400 transition-colors text-white">{item.title}</h3>
              <p className="text-xl text-white/60 leading-relaxed italic font-light">"{item.text}"</p>
              <div className="mt-8 flex items-center gap-2 text-blue-400 font-semibold text-sm">
                Читать полностью <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Block 4: Process */}
      <Section>
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-24 text-white">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
          {[
            { icon: MessageSquare, title: "1. Заявка", text: "Вы отвечаете на 4 вопроса бота. Это занимает всего 2 минуты." },
            { icon: Cpu, title: "2. Генерация", text: "Нейросеть пишет черновик, а я вдыхаю в него жизнь и стиль." },
            { icon: Send, title: "3. Готово", text: "Текст приходит вам в Telegram. Публикуйте и получайте охваты." }
          ].map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl backdrop-blur-xl">
                <step.icon className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-white/60 text-lg">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Block 5: Pricing */}
      <Section id="pricing">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 text-white">Тарифы</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Экспресс", price: "500", desc: "Один пост для соцсетей (до 1500 знаков).", time: "3 часа" },
            { name: "Блогер", price: "1500", desc: "3 поста на неделю + 1 идея для Reels.", time: "1 день", popular: true },
            { name: "Контент-план", price: "5000", desc: "10 постов + 3 сценария + 2 рассылки.", time: "3 дня" }
          ].map((plan, i) => (
            <div key={i} className={`glass-card p-10 flex flex-col bg-white/5 backdrop-blur-xl border-white/10 ${plan.popular ? 'border-blue-500/50 shadow-[0_0_50px_rgba(37,99,235,0.2)]' : ''}`}>
              {plan.popular && <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 self-start">Популярный</span>}
              <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/50 font-medium">руб.</span>
              </div>
              <p className="text-white/60 mb-8 flex-grow text-lg leading-relaxed">{plan.desc}</p>
              <div className="flex items-center gap-2 text-sm text-white/40 mb-10">
                <Zap className="w-4 h-4 text-blue-400" /> Срок: {plan.time}
              </div>
              <a href={TELEGRAM_LINK} className={`w-full py-4 rounded-2xl font-bold transition-all text-center ${plan.popular ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:scale-[1.02]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                Заказать
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Block 6: Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-32 pb-16 px-6 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-gradient leading-tight">Готовы к новому уровню контента?</h2>
          <a href={TELEGRAM_LINK} className="btn-premium text-xl px-16 py-6 inline-flex items-center gap-3">
            <MessageCircle className="w-6 h-6" /> Написать в Telegram
          </a>
          <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40 font-medium">
            <p>© 2026 AI CONTENT PRO. Все права защищены.</p>
            <p>Сделано с помощью ИИ и человеческого интеллекта.</p>
          </div>
        </div>
      </footer>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-slate-900 w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 block">{selectedItem.tag}</span>
              <h3 className="text-3xl font-bold mb-8 text-white">{selectedItem.title}</h3>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <p className="text-xl text-white/80 leading-relaxed italic font-light whitespace-pre-line">
                  "{selectedItem.fullText}"
                </p>
              </div>
              <div className="mt-10">
                <a href={TELEGRAM_LINK} className="btn-premium w-full text-center">Хочу такой же текст</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
