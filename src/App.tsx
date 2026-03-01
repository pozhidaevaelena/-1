/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { generateHeroImage } from "./services/imageService";
import { Sparkles, Zap, Target, Layers, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";

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
    className="glass-card p-8 group"
  >
    <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-[#2563EB] w-6 h-6" />
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
    <p className="text-white/60 leading-relaxed text-lg">{children}</p>
  </motion.div>
);

export default function App() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    async function loadImage() {
      try {
        const img = await generateHeroImage();
        if (img) {
          setHeroImage(img);
        } else {
          // Fallback to a concrete workspace photo if API fails
          setHeroImage("https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000");
        }
      } catch (error) {
        console.error("Failed to generate image:", error);
        setHeroImage("https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000");
      } finally {
        setLoadingImage(false);
      }
    }
    loadImage();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white/80 selection:bg-[#2563EB]/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-mesh pointer-events-none opacity-50" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-black/20 border border-white/5 px-6 py-3 rounded-full">
          <div className="text-xl font-display font-bold text-white tracking-tighter flex items-center gap-2">
            <Sparkles className="text-[#2563EB] w-5 h-5" />
            AI CONTENT PRO
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#advantages" className="hover:text-white transition-colors">Преимущества</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Портфолио</a>
            <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
          </div>
          <a href={TELEGRAM_LINK} className="text-sm font-semibold bg-white text-black px-5 py-2 rounded-full hover:bg-[#2563EB] hover:text-white transition-all">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#2563EB] mb-8">
            <Zap className="w-4 h-4 fill-current" />
            Будущее копирайтинга уже здесь
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-gradient">
            Контент, который <span className="text-[#2563EB]">продает</span>.
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-10 leading-relaxed max-w-xl">
            Созданный нейросетью, доведённый до совершенства человеком. Скорость света, креативность машины и 100% контроль качества.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={TELEGRAM_LINK} className="btn-premium text-lg flex items-center justify-center gap-2">
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
          <div className="absolute inset-0 bg-[#2563EB]/20 blur-[100px] rounded-full group-hover:bg-[#2563EB]/30 transition-colors duration-700" />
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
            <AnimatePresence mode="wait">
              {loadingImage ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-12 h-12 border-4 border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin" />
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
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                  <p>Image failed to load</p>
                </div>
              )}
            </AnimatePresence>
          </div>
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass-card px-6 py-4 flex items-center gap-4 shadow-2xl"
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Почему я?</h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">Сочетание технологий и опыта дает результат, недоступный обычным копирайтерам.</p>
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
      <Section id="portfolio" className="bg-white/[0.02] border-y border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Портфолио</h2>
          <p className="text-xl text-white/40">Тексты, которые уже приносят результат клиентам.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { tag: "Lifestyle", title: "Пост для кофейни", text: "«Осень пришла не только в город, но и в наше меню. Тыквенный латте уже ждёт тебя, согревая не хуже пледа...»" },
            { tag: "Expert", title: "Пост для психолога", text: "«Усталость — это не всегда про работу. Иногда это про то, что мы слишком долго несём груз чужих ожиданий...»" },
            { tag: "Video", title: "Сценарий для Reels", text: "«Кадр 1: будильник. Кадр 2: лениво тянется. Кадр 3: резко встаёт. Текст: «Утро без геройства...»" },
            { tag: "Sales", title: "Продающий пост", text: "«Перестань ждать понедельника. Начни сегодня. Запишись на бесплатную диагностику и узнай, как удвоить доход...»" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-10 group cursor-default"
            >
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-4 block">{item.tag}</span>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-[#2563EB] transition-colors">{item.title}</h3>
              <p className="text-xl text-white/50 leading-relaxed italic">"{item.text}"</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Block 4: Process */}
      <Section>
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-24">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
          {[
            { icon: "💬", title: "Заявка", text: "Вы отвечаете на 4 вопроса бота. Это занимает всего 2 минуты." },
            { icon: "⚙️", title: "Генерация", text: "Нейросеть пишет черновик, а я вдыхаю в него жизнь и стиль." },
            { icon: "✅", title: "Готово", text: "Текст приходит вам в Telegram. Публикуйте и получайте охваты." }
          ].map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 border border-white/10 group-hover:scale-110 group-hover:border-[#2563EB]/50 transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/40 text-lg">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Block 5: Pricing */}
      <Section id="pricing">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">Тарифы</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Экспресс", price: "500", desc: "Один пост для соцсетей (до 1500 знаков).", time: "3 часа" },
            { name: "Блогер", price: "1500", desc: "3 поста на неделю + 1 идея для Reels.", time: "1 день", popular: true },
            { name: "Контент-план", price: "5000", desc: "10 постов + 3 сценария + 2 рассылки.", time: "3 дня" }
          ].map((plan, i) => (
            <div key={i} className={`glass-card p-10 flex flex-col ${plan.popular ? 'border-[#2563EB]/50 bg-white/[0.05]' : ''}`}>
              {plan.popular && <span className="bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 self-start">Популярный</span>}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/40 font-medium">руб.</span>
              </div>
              <p className="text-white/60 mb-8 flex-grow text-lg leading-relaxed">{plan.desc}</p>
              <div className="flex items-center gap-2 text-sm text-white/40 mb-10">
                <Zap className="w-4 h-4" /> Срок: {plan.time}
              </div>
              <a href={TELEGRAM_LINK} className={`w-full py-4 rounded-xl font-bold transition-all text-center ${plan.popular ? 'bg-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-[1.02]' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                Заказать
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Block 6: Footer */}
      <footer className="relative z-10 border-t border-white/5 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-gradient leading-tight">Готовы к новому уровню контента?</h2>
          <a href={TELEGRAM_LINK} className="btn-premium text-xl px-16 py-6 inline-flex items-center gap-3">
            <MessageCircle className="w-6 h-6" /> Написать в Telegram
          </a>
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/20 font-medium">
            <p>© 2026 AI CONTENT PRO. Все права защищены.</p>
            <p>Сделано с помощью ИИ и человеческого интеллекта.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
