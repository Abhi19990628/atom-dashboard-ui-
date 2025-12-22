import { motion } from 'motion/react';
import { Bell, Check, X, AlertCircle, CheckCircle2, Clock, Settings } from 'lucide-react';
import Sidebar from './Sidebar';
import { Card } from './ui/card';
import { Button } from './ui/button';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Machine M-15 Tool Change Required',
      message: 'Tool wear detected on Machine M-15. Immediate tool change recommended.',
      time: '2 mins ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'success',
      title: 'Quality Check Passed - Plant 1',
      message: 'All quality parameters within acceptable range for the last 100 parts.',
      time: '15 mins ago',
      read: false,
      priority: 'low'
    },
    {
      id: 3,
      type: 'info',
      title: 'Operator Shift Change',
      message: 'Shift B operators have been assigned to their machines.',
      time: '1 hour ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Machine M-23 Shut Height Adjusted',
      message: 'Automatic shut height adjustment completed successfully.',
      time: '2 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'alert',
      title: 'NG Parts Detected - M-08',
      message: '3 consecutive NG parts detected. Quality inspection required.',
      time: '3 hours ago',
      read: true,
      priority: 'high'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2 bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent relative inline-block"
              >
                Notifications
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-yellow-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400"
              >
                Stay updated with your plant operations
              </motion.p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button 
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700/30"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`backdrop-blur-xl border p-6 transition-all hover:scale-[1.01] relative overflow-hidden ${
                  !notif.read 
                    ? 'bg-gradient-to-br from-cyan-500/10 to-[#1e293b]/60 border-cyan-500/30' 
                    : 'bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/60 border-slate-700/30'
                }`}>
                  {!notif.read && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-yellow-500" />
                  )}

                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center relative ${
                        notif.priority === 'high'
                          ? 'bg-red-500/20'
                          : notif.priority === 'medium'
                          ? 'bg-yellow-500/20'
                          : 'bg-cyan-500/20'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <div className={`absolute inset-0 blur-md opacity-30 ${
                        notif.priority === 'high'
                          ? 'bg-red-500'
                          : notif.priority === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-cyan-500'
                      } rounded-xl`} />
                      {notif.type === 'alert' && (
                        <AlertCircle className={`w-6 h-6 relative z-10 ${
                          notif.priority === 'high'
                            ? 'text-red-400'
                            : notif.priority === 'medium'
                            ? 'text-yellow-400'
                            : 'text-cyan-400'
                        }`} />
                      )}
                      {notif.type === 'success' && (
                        <CheckCircle2 className="w-6 h-6 text-green-400 relative z-10" />
                      )}
                      {notif.type === 'info' && (
                        <Bell className="w-6 h-6 text-cyan-400 relative z-10" />
                      )}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={!notif.read ? 'text-cyan-400' : 'text-slate-300'}>
                          {notif.title}
                        </h3>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 flex items-center justify-center text-cyan-400 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <p className="text-slate-400 mb-3">{notif.message}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{notif.time}</span>
                        {notif.priority === 'high' && (
                          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs border border-red-500/30">
                            High Priority
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
