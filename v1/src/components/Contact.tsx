/**
 * Contact.tsx
 * Componente de formulário de contato com validação e feedback visual.
 * 
 * Funcionalidades:
 * - Formulário de contato com validação
 * - Feedback visual de erros e sucesso
 * - Animações de transição
 * - Integração com serviço de email
 * - Suporte a temas claro/escuro
 * - Internacionalização com i18n
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    emailjs.init('heb98utZ3Qz_MHPoR');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      console.log('Enviando email...');
      const result = await emailjs.send(
        'eduardogenes',
        'template_dcoh7mb',
        {
          from_name: formRef.current?.from_name.value,
          from_email: formRef.current?.from_email.value,
          message: formRef.current?.message.value,
        },
        'heb98utZ3Qz_MHPoR'
      );
      console.log('Resultado:', result);

      setSuccess(true);
      formRef.current.reset();
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(t('contact.form.error'));
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="w-6 h-6" />,
      text: 'eduardogenes95@gmail.com',
      href: 'mailto:eduardogenes95@gmail.com'
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      text: '(85) 98109-7155',
      href: 'tel:+5585981097155'
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      text: 'Fortaleza, CE',
      href: 'https://maps.google.com/?q=Fortaleza,CE'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <FiMail className="w-8 h-8 text-blue-500" />
            <span className="animated-gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.text}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    {info.icon}
                  </div>
                  <span>{info.text}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                transition: { duration: 0.2 }
              }}
              className="p-4 bg-white dark:bg-gray-900/80 rounded-xl cursor-default transition-colors shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                {t('contact.workingHours.title')}
              </h3>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <p>Segunda - Sexta</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 ml-3.5 text-sm">8:00 - 18:00</p>
            </motion.div>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="text-gray-600 dark:text-gray-400 text-sm">{t('contact.form.name')}</label>
              <input
                type="text"
                name="from_name"
                placeholder={t('contact.form.placeholders.name')}
                required
                className="w-full mt-1 px-4 py-2.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-700/80 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-400 text-sm">{t('contact.form.email')}</label>
              <input
                type="email"
                name="from_email"
                placeholder={t('contact.form.placeholders.email')}
                required
                className="w-full mt-1 px-4 py-2.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-700/80 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-400 text-sm">{t('contact.form.message')}</label>
              <textarea
                name="message"
                placeholder={t('contact.form.placeholders.message')}
                required
                rows={4}
                className="w-full mt-1 px-4 py-2.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-700/80 text-gray-900 dark:text-white rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div className="flex justify-center pt-2">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-8 py-3 bg-blue-500/90 hover:bg-blue-600/90 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-white/80 rounded-full animate-spin mr-2" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5 mr-2" />
                    {t('contact.form.send')}
                  </>
                )}
              </motion.button>
            </div>
            
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500/90 text-center text-sm"
              >
                {t('contact.form.success')}
              </motion.p>
            )}
            
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500/90 text-center text-sm"
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
