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
    className="glass-card p-8 group bg-white shadow-sm"
  >
    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-blue-600 w-6 h-6" />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-[#262626]">{title}</h3>
    <p className="text-[#262626]/70 leading-relaxed text-lg">{children}</p>
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
      setLoadingImage(true);
      try {
        // Используем относительный путь, который корректно работает в Vite для файлов из папки public
        const localPhoto = "hero.jpg";
        setHeroImage(`${localPhoto}?t=${Date.now()}`);
      } catch (error) {
        console.error("Failed to load image:", error);
        setHeroImage("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=1000");
      } finally {
        // Небольшая задержка, чтобы состояние успело обновиться
        setTimeout(() => setLoadingImage(false), 100);
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
    <div className="min-h-screen bg-orange-50/30 text-[#262626] selection:bg-amber-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-100" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-100/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100/30 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-white/80 border border-black/5 px-6 py-3 rounded-full shadow-sm">
          <div className="text-xl font-display font-bold text-[#262626] tracking-tighter flex items-center gap-2">
            <Sparkles className="text-amber-600 w-5 h-5" />
            AI CONTENT PRO
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-[#262626]/70">
            <a href="#advantages" className="hover:text-amber-600 transition-colors">Преимущества</a>
            <a href="#portfolio" className="hover:text-amber-600 transition-colors">Портфолио</a>
            <a href="#pricing" className="hover:text-amber-600 transition-colors">Цены</a>
          </div>
          <a href={TELEGRAM_LINK} className="text-sm font-semibold bg-[#262626] text-white px-5 py-2 rounded-full hover:bg-amber-600 transition-all">
            Связаться
          </a>
        </div>
      </nav>

      {/* Block 1: Hero */}
      <Section className="pt-24 md:pt-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-5xl mx-auto mb-16 md:mb-24"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-black/5 bg-white shadow-2xl group">
            {heroImage && (
              <motion.img 
                key={heroImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={heroImage}
                alt="AI Content Creator"
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={() => setHeroImage("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=1000")}
              />
            )}
            {!heroImage && !loadingImage && (
              <div className="absolute inset-0 bg-white flex items-center justify-center">
                <p className="text-[#262626]/40">Фото не найдено</p>
              </div>
            )}
            {loadingImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/50">
                <div className="w-12 h-12 border-4 border-amber-100 border-t-amber-600 rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Neon Badge positioned at the bottom center of the image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 w-max"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-bold text-sm md:text-base shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-amber-400 animate-pulse">
              <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              Будущее копирайтинга уже здесь
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold leading-[1.1] mb-6 md:mb-8 text-gradient">
            Контент<br /> <span className="whitespace-nowrap">который <span className="text-amber-600">продает</span></span>
          </h1>
          <p className="text-xl md:text-3xl text-[#262626]/70 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
            Созданный нейросетью, доведённый до совершенства человеком. Скорость света, креативность машины и 100% контроль качества.
          </p>
          <div className="flex justify-center">
            <a href={TELEGRAM_LINK} className="btn-premium text-xl px-12 py-6 flex items-center justify-center gap-2 text-center">
              Заказать консультацию <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </Section>

      {/* Block 2: Advantages */}
      <Section id="advantages">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#262626]">Почему я?</h2>
          <p className="text-xl text-[#262626]/60 max-w-2xl mx-auto">Сочетание технологий и опыта дает результат, недоступный обычным копирайтерам.</p>
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
      <Section id="portfolio" className="bg-amber-50/30 border-y border-black/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#262626]">Портфолио</h2>
          <p className="text-xl text-[#262626]/60">Тексты, которые уже приносят результат клиентам.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedItem(item)}
              className="glass-card p-10 group cursor-pointer bg-white"
            >
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 block">{item.tag}</span>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-amber-600 transition-colors text-[#262626]">{item.title}</h3>
              <p className="text-xl text-[#262626]/60 leading-relaxed italic font-light">"{item.text}"</p>
              <div className="mt-8 flex items-center gap-2 text-amber-600 font-semibold text-sm">
                Читать полностью <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Block 4: Process */}
      <Section>
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-24 text-[#262626]">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent hidden md:block" />
          {[
            { icon: MessageSquare, title: "1. Заявка", text: "Вы отвечаете на 4 вопроса бота. Это занимает всего 2 минуты." },
            { icon: Cpu, title: "2. Генерация", text: "Нейросеть пишет черновик, а я вдыхаю в него жизнь и стиль." },
            { icon: Send, title: "3. Готово", text: "Текст приходит вам в Telegram. Публикуйте и получайте охваты." }
          ].map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 border border-black/5 group-hover:scale-110 group-hover:border-amber-600/20 transition-all duration-500 shadow-lg">
                <step.icon className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#262626]">{step.title}</h3>
              <p className="text-[#262626]/70 text-lg">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Block 5: Pricing */}
      <Section id="pricing">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 text-[#262626]">Тарифы</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Экспресс", price: "500", desc: "Один пост для соцсетей (до 1500 знаков).", time: "3 часа" },
            { name: "Блогер", price: "1500", desc: "3 поста на неделю + 1 идея для Reels.", time: "1 день", popular: true },
            { name: "Контент-план", price: "5000", desc: "10 постов + 3 сценария + 2 рассылки.", time: "3 дня" }
          ].map((plan, i) => (
            <div key={i} className={`glass-card p-10 flex flex-col bg-white ${plan.popular ? 'border-amber-600/20 shadow-xl' : ''}`}>
              {plan.popular && <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 self-start">Популярный</span>}
              <h3 className="text-2xl font-bold mb-2 text-[#262626]">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-[#262626]">{plan.price}</span>
                <span className="text-[#262626]/50 font-medium">руб.</span>
              </div>
              <p className="text-[#262626]/70 mb-8 flex-grow text-lg leading-relaxed">{plan.desc}</p>
              <div className="flex items-center gap-2 text-sm text-[#262626]/40 mb-10">
                <Zap className="w-4 h-4 text-amber-600" /> Срок: {plan.time}
              </div>
              <a href={TELEGRAM_LINK} className={`w-full py-4 rounded-2xl font-bold transition-all text-center ${plan.popular ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20 hover:scale-[1.02]' : 'bg-slate-100 text-[#262626] hover:bg-slate-200'}`}>
                Заказать
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Block 6: Footer */}
      <footer className="relative z-10 border-t border-black/5 pt-32 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-gradient leading-tight">Готовы к новому уровню контента?</h2>
          <a href={TELEGRAM_LINK} className="btn-premium text-xl px-16 py-6 inline-flex items-center gap-3">
            <MessageCircle className="w-6 h-6" /> Написать в Telegram
          </a>
          <div className="mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#262626]/40 font-medium">
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
              className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden border border-black/5"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 block">{selectedItem.tag}</span>
              <h3 className="text-3xl font-bold mb-8 text-[#262626]">{selectedItem.title}</h3>
              <div className="bg-amber-50/50 p-8 rounded-3xl border border-black/5">
                <p className="text-xl text-[#262626]/80 leading-relaxed italic font-light whitespace-pre-line">
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
