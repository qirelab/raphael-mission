import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { projectsService } from '../../services/projectsService';
import { testimoniesService } from '../../services/testimoniesService';
// import { trainingService } from '../../services/trainingService'; // Temporarily hidden
import { shopService } from '../../services/shopService';

const Dashboard = () => {
  const location = useLocation();
  const [stats, setStats] = useState({
    projects: 0,
    testimonies: 0,
    // training: 0, // Temporarily hidden
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  // Refresh stats when navigating back to dashboard
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, testimonies, /* training, */ products] = await Promise.all([
          projectsService.getAll(),
          testimoniesService.getAll(),
          // trainingService.getAll(), // Temporarily hidden
          shopService.getAll(),
        ]);

        setStats({
          projects: projects.length,
          testimonies: testimonies.length,
          // training: training.length, // Temporarily hidden
          products: products.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [location.pathname]);

  const statCards = [
    {
      title: 'Проекты',
      value: stats.projects,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      color: 'bg-blue-500',
      link: '/admin/projects',
    },
    {
      title: 'Свидетельства',
      value: stats.testimonies,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      color: 'bg-green-500',
      link: '/admin/testimonies',
    },
    // {
    //   title: 'Программы обучения',
    //   value: stats.training,
    //   icon: (
    //     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth={2}
    //         d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    //       />
    //     </svg>
    //   ),
    //   color: 'bg-purple-500',
    //   link: '/admin/training',
    // }, // Temporarily hidden
    {
      title: 'Товары',
      value: stats.products,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      color: 'bg-orange-500',
      link: '/admin/shop',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F7D6D]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">
          Панель управления
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-poppins">
          Добро пожаловать в панель администратора Raphael Mission
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-4 sm:p-6 border border-gray-100 hover:border-[#2F7D6D]/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 font-poppins truncate">
                  {card.title}
                </p>
                <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900 font-poppins">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-2 sm:p-3 rounded-lg text-white flex-shrink-0 ml-3`}>
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-poppins mb-3 sm:mb-4">
          Быстрые действия
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 border-gray-200 hover:border-[#2F7D6D] ${action.hoverBg} transition-all duration-200`}
            >
              <div className={`${action.iconBg} p-2 rounded-lg flex-shrink-0`}>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${action.iconColor}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={action.iconPath}
                  />
                </svg>
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-700 font-poppins">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const quickActions = [
  {
    label: 'Добавить новый проект',
    to: '/admin/projects/new',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-50/30',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
  },
  {
    label: 'Добавить новое свидетельство',
    to: '/admin/testimonies/new',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    hoverBg: 'hover:bg-green-50/30',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
  },
  {
    label: 'Добавить новый товар',
    to: '/admin/shop/new',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    hoverBg: 'hover:bg-orange-50/30',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
  },
  {
    label: 'Редактировать главную',
    to: '/admin/home',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
    hoverBg: 'hover:bg-teal-50/30',
    iconPath: 'M3 9.75L12 3l9 6.75V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.75z',
  },
  {
    label: 'Обновить контакты',
    to: '/admin/contact',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    hoverBg: 'hover:bg-purple-50/30',
    iconPath:
      'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: 'Редактировать пожертвования',
    to: '/admin/donation',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    hoverBg: 'hover:bg-rose-50/30',
    iconPath:
      'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    label: 'Редактировать «О нас»',
    to: '/admin/about',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    hoverBg: 'hover:bg-sky-50/30',
    iconPath:
      'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

export default Dashboard;
