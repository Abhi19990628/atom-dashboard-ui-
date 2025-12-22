
// // import {
// //   Factory,
// //   Users,
// //   Target,
// //   Award,
// //   Shield,
// //   Lightbulb,
// //   Heart,
// //   Eye,
// //   CheckCircle,
// //   Camera,
// //   Gauge,
// //   Database,
// //   Bell,
// //   Cpu,
// //   Wrench,
// //   ClipboardCheck,
// //   Cog,
// //   DollarSign,
// //   Globe,
// //   Zap,
// // } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';

// // const coreValues = [
// //   { icon: Lightbulb, label: 'Innovation', color: 'cyan' },
// //   { icon: Award, label: 'Excellence', color: 'yellow' },
// //   { icon: Shield, label: 'Integrity', color: 'cyan' },
// //   { icon: Eye, label: 'Transparency', color: 'yellow' },
// //   { icon: CheckCircle, label: 'Accountability', color: 'cyan' },
// //   { icon: Heart, label: 'Social Responsibility', color: 'yellow' },
// // ];

// // const technologies = [
// //   {
// //     icon: Camera,
// //     title: 'AI-Powered Visual Inspection',
// //     description:
// //       'Automated NG (Not Good) and OK part detection with AI camera system',
// //     subtitle: 'Real-time quality verification on every machine',
// //   },
// //   {
// //     icon: Gauge,
// //     title: 'Real-Time Machine Intelligence',
// //     description: 'Live monitoring: Shut Height, Tool ID, Machine Count',
// //     subtitle: 'Instant email alerts for any parameter changes',
// //   },
// //   {
// //     icon: Database,
// //     title: 'Comprehensive Data Tracking',
// //     description: 'Live counts: Machine-wise, Part-wise, Customer-wise',
// //     subtitle: 'Complete visibility from everywhere, anytime',
// //   },
// //   {
// //     icon: Bell,
// //     title: 'Intelligent Alert System',
// //     description:
// //       'Automated email notifications for tool changes, height adjustments',
// //     subtitle: 'Proactive maintenance alerts',
// //   },
// // ];

// // const teams = [
// //   { icon: Cpu, label: 'IT & IoT Team' },
// //   { icon: Factory, label: 'Production Team' },
// //   { icon: Wrench, label: 'Maintenance Team' },
// //   { icon: ClipboardCheck, label: 'Quality Team' },
// //   { icon: Cog, label: 'Tool Team' },
// // ];

// // const products = [
// //   'Muffler Parts',
// //   'Chassis Parts',
// //   'Tubular Parts',
// //   'Flanges',
// //   'Busbars',
// //   'Machined Parts',
// //   'Draw Parts',
// //   'Custom Components',
// // ];

// // // icon choose by product name
// // const getProductIcon = (name) => {
// //   const n = name.toLowerCase();
// //   if (n.includes('muffler')) return Factory;
// //   if (n.includes('chassis')) return Shield;
// //   if (n.includes('tubular')) return Database;
// //   if (n.includes('flange')) return Target;
// //   if (n.includes('busbar')) return Zap;
// //   if (n.includes('machined')) return Cpu;
// //   if (n.includes('draw')) return Gauge;
// //   return Cog;
// // };

// // export default function LandingPage() {
// //   const navigate = useNavigate();

// //   const missionPoints = [
// //     { icon: CheckCircle, label: 'Quality', color: 'text-cyan-400' },
// //     { icon: Shield, label: 'Safety', color: 'text-amber-300' },
// //     { icon: DollarSign, label: 'Profitability', color: 'text-emerald-400' },
// //     { icon: Award, label: 'Integrity', color: 'text-cyan-400' },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-slate-950 text-slate-50">
// //       {/* Hero Section */}
// //       <div className="relative bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 overflow-hidden min-h-screen">
// //         {/* Bubble Background */}
// //         <div className="absolute inset-0">
// //           <div className="absolute inset-0 opacity-20">
// //             <div className="absolute top-28 -left-10 w-80 h-80 bg-cyan-500 rounded-full mix-blend-soft-light blur-3xl opacity-40 animate-blob" />
// //             <div className="absolute top-8 -right-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-soft-light blur-3xl opacity-35 animate-blob animation-delay-2000" />
// //             <div className="absolute -bottom-16 left-1/2 w-96 h-96 bg-emerald-400 rounded-full mix-blend-soft-light blur-3xl opacity-30 animate-blob animation-delay-4000" />
// //           </div>
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               backgroundImage:
// //                 'repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(6,182,212,0.03) 35px,rgba(6,182,212,0.03) 70px),repeating-linear-gradient(-45deg,transparent,transparent 35px,rgba(251,191,36,0.03) 35px,rgba(251,191,36,0.03) 70px)',
// //             }}
// //           />
// //         </div>

// //         {/* Navbar */}
// //         <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 backdrop-blur-sm">
// //           <div
// //             className="flex items-center gap-3 group cursor-pointer"
// //             onClick={() => navigate('/')}
// //           >
// //             <div className="flex items-center">
// //               <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-cyan-400 to-amber-300 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/50 transform group-hover:scale-110 transition-transform duration-300">
// //                 <Factory className="w-6 h-6 md:w-7 md:h-7 text-slate-900" />
// //               </div>
// //               <span className="ml-2 md:ml-3 text-2xl md:text-3xl text-slate-50 tracking-tight">
// //                 AtomOne
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex gap-2 md:gap-4">
// //             <button
// //               onClick={() => navigate('/login')}
// //               className="px-3 py-1.5 text-xs md:px-8 md:py-3 md:text-base bg-cyan-500/10 backdrop-blur-sm border border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105"
// //             >
// //               Login
// //             </button>
// //             <button
// //               onClick={() => navigate('/signup')}
// //               className="px-3 py-1.5 text-xs md:px-8 md:py-3 md:text-base bg-gradient-to-r from-amber-300 to-amber-400 text-slate-900 rounded-xl hover:shadow-2xl hover:shadow-amber-300/50 transition-all duration-300 hover:scale-105"
// //             >
// //               Sign Up
// //             </button>
// //           </div>
// //         </nav>

// //         {/* Hero Content */}
// //         <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
// //           <div className="mb-6 inline-block animate-fade-in-up">
// //             <span className="px-6 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-400 text-sm animate-pulse">
// //               🚀 Industry 4.0 Smart Factory Platform
// //             </span>
// //           </div>
// //           <h1 className="text-4xl sm:text-5xl md:text-7xl mb-6 md:mb-8 text-slate-50 tracking-tight leading-tight animate-fade-in-up">
// //             Precision in Every Cut,
// //             <br />
// //             <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-emerald-400 text-transparent bg-clip-text">
// //               Excellence in Every Fold
// //             </span>
// //           </h1>
// //           <p className="text-base sm:text-lg md:text-2xl text-slate-400 mb-10 md:mb-16 animate-fade-in-up animation-delay-200">
// //             25+ Years of Metal Stamping Excellence | Industry 4.0 Leader
// //           </p>

// //           {/* Statistics Bar */}
// //           <div className="flex flex-wrap justify-center gap-6 mt-10 md:mt-20 animate-fade-in-up animation-delay-400">
// //             <div className="group flex items-center gap-4 bg-slate-800/80 backdrop-blur-xl px-6 md:px-8 py-5 md:py-6 rounded-2xl border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20 hover:scale-105">
// //               <div className="p-3 bg-cyan-400/10 rounded-xl group-hover:bg-cyan-400/20 transition-all duration-300">
// //                 <Users className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
// //               </div>
// //               <div className="text-left">
// //                 <div className="text-2xl md:text-3xl text-slate-50 mb-1">
// //                   400+
// //                 </div>
// //                 <div className="text-xs md:text-sm text-slate-400">
// //                   Employees
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="group flex items-center gap-4 bg-slate-800/80 backdrop-blur-xl px-6 md:px-8 py-5 md:py-6 rounded-2xl border border-amber-300/30 hover:border-amber-300 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-300/20 hover:scale-105">
// //               <div className="p-3 bg-amber-300/10 rounded-xl group-hover:bg-amber-300/20 transition-all duration-300">
// //                 <Factory className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
// //               </div>
// //               <div className="text-left">
// //                 <div className="text-2xl md:text-3xl text-slate-50 mb-1">
// //                   3
// //                 </div>
// //                 <div className="text-xs md:text-sm text-slate-400">
// //                   Manufacturing Units
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="group flex items-center gap-4 bg-slate-800/80 backdrop-blur-xl px-6 md:px-8 py-5 md:py-6 rounded-2xl border border-emerald-400/30 hover:border-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/20 hover:scale-105">
// //               <div className="p-3 bg-emerald-400/10 rounded-xl group-hover:bg-emerald-400/20 transition-all duration-300">
// //                 <Cog className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
// //               </div>
// //               <div className="text-left">
// //                 <div className="text-2xl md:text-3xl text-slate-50 mb-1">
// //                   100+
// //                 </div>
// //                 <div className="text-xs md:text-sm text-slate-400">
// //                   Presses (450T)
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mission Section */}
// //       <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 animate-fade-in-up animation-delay-200">
// //         <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-16 border border-cyan-400/30 overflow-hidden shadow-2xl">
// //           <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-cyan-400/10 rounded-full blur-3xl" />
// //           <div className="absolute bottom-0 left-0 w-40 md:w-64 h-40 md:h-64 bg-amber-300/10 rounded-full blur-3xl" />

// //           <div className="relative z-10">
// //             <div className="text-center mb-10 md:mb-12">
// //               <span className="text-xs md:text-sm text-cyan-400 tracking-[0.25em] uppercase mb-4 block">
// //                 Our Purpose
// //               </span>
// //               <h2 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-3">
// //                 Our Mission
// //               </h2>
// //               <p className="text-sm md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
// //                 To deliver end-to-end solutions in metal stamping and sheet
// //                 metal processing.
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
// //               {missionPoints.map((item, i) => {
// //                 const Icon = item.icon;
// //                 return (
// //                   <div
// //                     key={i}
// //                     className="group text-center hover:scale-110 transition-all duration-300"
// //                   >
// //                     <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900/40 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:shadow-lg group-hover:shadow-cyan-400/40 transition-all duration-300">
// //                       <Icon
// //                         className={`w-8 h-8 md:w-10 md:h-10 ${item.color}`}
// //                       />
// //                     </div>
// //                     <div className="text-sm md:text-lg text-slate-50">
// //                       {item.label}
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Vision Section */}
// //       <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 animate-fade-in-up animation-delay-250">
// //         <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-2xl p-8 md:p-12 border border-amber-300/20">
// //           <h2 className="text-3xl md:text-4xl font-semibold text-center text-slate-50 mb-3">
// //             Our Vision
// //           </h2>
// //           <p className="text-sm md:text-lg text-center text-slate-200 mb-8 md:mb-12 max-w-3xl mx-auto">
// //             To be the preferred partner of OEMs and Tier 1 suppliers globally.
// //           </p>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
// //             <div className="text-center">
// //               <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-300/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
// //                 <Globe className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
// //               </div>
// //               <div className="text-slate-50">Global Reach</div>
// //             </div>
// //             <div className="text-center">
// //               <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-300/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
// //                 <Cpu className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
// //               </div>
// //               <div className="text-slate-50">Engineering Excellence</div>
// //             </div>
// //             <div className="text-center">
// //               <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-300/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
// //                 <Target className="w-8 h-8 md:w-10 md:h-10 text-amber-300" />
// //               </div>
// //               <div className="text-slate-50">Customer Satisfaction</div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Core Values */}
// //       <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 animate-fade-in-up animation-delay-300">
// //         <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-center text-slate-50">
// //           Core Values
// //         </h2>
// //         <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
// //           {coreValues.map((value, index) => {
// //             const Icon = value.icon;
// //             const colorClass =
// //               value.color === 'cyan'
// //                 ? 'text-cyan-400 bg-cyan-400/10'
// //                 : 'text-amber-300 bg-amber-300/10';
// //             return (
// //               <div key={index} className="text-center">
// //                 <div
// //                   className={`w-14 h-14 md:w-16 md:h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}
// //                 >
// //                   <Icon className="w-7 h-7 md:w-8 md:h-8" />
// //                 </div>
// //                 <div className="text-xs md:text-base text-slate-50">
// //                   {value.label}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* Advanced Technology */}
// //       <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24 overflow-hidden animate-fade-in-up animation-delay-350">
// //         <div className="absolute inset-0 opacity-10">
// //           <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-400 rounded-full blur-3xl" />
// //           <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-amber-300 rounded-full blur-3xl" />
// //         </div>

// //         <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
// //           <div className="text-center mb-12 md:mb-16">
// //             <div className="inline-block mb-4 md:mb-6">
// //               <span className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-400/20 to-amber-300/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-400 text-xs md:text-sm">
// //                 ⚡ Powered by AI &amp; IoT
// //               </span>
// //             </div>
// //             <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-slate-50">
// //               Industry 4.0 Smart Factory
// //             </h2>
// //             <p className="text-sm md:text-lg bg-gradient-to-r from-cyan-400 to-amber-300 text-transparent bg-clip-text">
// //               Advanced Monitoring System
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-2 gap-6 md:gap-8">
// //             {technologies.map((tech, index) => {
// //               const Icon = tech.icon;
// //               return (
// //                 <div
// //                   key={index}
// //                   className="group relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700 hover:border-cyan-400 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 hover:scale-105"
// //                 >
// //                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //                   <div className="relative flex items-start gap-4 md:gap-5">
// //                     <div className="p-3 md:p-4 bg-cyan-400/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-400/20">
// //                       <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
// //                     </div>
// //                     <div>
// //                       <h3 className="text-xl md:text-2xl mb-2 md:mb-3 text-slate-50 group-hover:text-cyan-400 transition-colors duration-300">
// //                         {tech.title}
// //                       </h3>
// //                       <p className="text-sm md:text-base text-slate-400 mb-2 md:mb-3 leading-relaxed">
// //                         {tech.description}
// //                       </p>
// //                       <p className="text-xs md:text-sm text-cyan-400 flex items-center gap-1.5 md:gap-2">
// //                         <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
// //                         {tech.subtitle}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Teams */}
// //       <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 animate-fade-in-up animation-delay-400">
// //         <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-center text-slate-50">
// //           Our Expert Teams
// //         </h2>
// //         <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// //           {teams.map((team, index) => {
// //             const Icon = team.icon;
// //             return (
// //               <div
// //                 key={index}
// //                 className="bg-slate-800 rounded-xl p-5 md:p-6 text-center border border-slate-700 hover:border-cyan-400/60 transition-colors"
// //               >
// //                 <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
// //                   <Icon className="w-7 h-7 md:w-8 md:h-8 text-cyan-400" />
// //                 </div>
// //                 <div className="text-xs md:text-base text-slate-50">
// //                   {team.label}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* Digital Impact */}
// //       <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 animate-fade-in-up animation-delay-450">
// //         <div className="relative bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-900 rounded-3xl p-10 md:p-16 border-2 border-amber-300/40 overflow-hidden shadow-2xl">
// //           <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.15),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(6,182,212,0.15),_transparent_60%)]" />
// //           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

// //           <div className="relative z-10">
// //             <div className="text-center mb-12 md:mb-16">
// //               <h2 className="text-3xl md:text-4xl font-semibold mb-3 md:mb-4 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 text-transparent bg-clip-text">
// //                 Digital Transformation Impact
// //               </h2>
// //               <p className="text-sm md:text-lg text-slate-400">
// //                 Measurable results from our Industry 4.0 implementation
// //               </p>
// //             </div>
// //             <div className="grid md:grid-cols-4 gap-8 md:gap-10">
// //               {[
// //                 { label: 'Machine Utilization', value: '15–20%', sub: 'Increment' },
// //                 { label: 'Operator Efficiency', value: '8–12%', sub: 'Increase' },
// //                 { label: 'Quality', value: '10–15%', sub: 'Improvement' },
// //               ].map((item) => (
// //                 <div
// //                   key={item.label}
// //                   className="group text-center transform hover:scale-110 transition-all duration-300"
// //                 >
// //                   <div className="mb-5 md:mb-6 relative">
// //                     <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
// //                     <div className="relative text-3xl md:text-5xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-transparent bg-clip-text">
// //                       {item.value}
// //                     </div>
// //                   </div>
// //                   <div className="text-slate-50 mb-1 text-sm md:text-base">
// //                     {item.label}
// //                   </div>
// //                   <div className="text-slate-400 text-xs md:text-sm">
// //                     {item.sub}
// //                   </div>
// //                 </div>
// //               ))}
// //               <div className="group text-center transform hover:scale-110 transition-all duration-300">
// //                 <div className="mb-4 md:mb-5 relative flex items-center justify-center">
// //                   <div className="p-4 md:p-6 bg-gradient-to-br from-amber-300/20 to-amber-300/5 rounded-2xl group-hover:shadow-lg group-hover:shadow-amber-300/50 transition-all duration-300">
// //                     <Zap className="w-10 h-10 md:w-16 md:h-16 text-amber-300" />
// //                   </div>
// //                 </div>
// //                 <div className="text-slate-50 mb-1 text-sm md:text-base">
// //                   Real-time Data
// //                 </div>
// //                 <div className="text-slate-400 text-xs md:text-sm">
// //                   Visibility
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Products */}
// //       <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 animate-fade-in-up animation-delay-500">
// //         <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-center text-slate-50">
// //           Our Products
// //         </h2>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //           {products.map((product, index) => {
// //             const Icon = getProductIcon(product);
// //             const isCyan = index % 2 === 0;
// //             return (
// //               <div
// //                 key={product}
// //                 className="bg-slate-800 rounded-xl p-5 md:p-6 text-center border border-slate-700 hover:border-cyan-400/60 transition-colors"
// //               >
// //                 <div
// //                   className={`w-10 h-10 md:w-12 md:h-12 ${
// //                     isCyan
// //                       ? 'bg-cyan-400/10 text-cyan-400'
// //                       : 'bg-amber-300/10 text-amber-300'
// //                   } rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4`}
// //                 >
// //                   <Icon className="w-5 h-5 md:w-6 md:h-6" />
// //                 </div>
// //                 <div className="text-xs md:text-base text-slate-50">
// //                   {product}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-slate-900 border-t border-cyan-400/20">
// //         <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
// //           <div className="grid md:grid-cols-3 gap-8">
// //             <div>
// //               <div className="flex items-center gap-3 mb-3 md:mb-4">
// //                 <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-cyan-400 to-amber-300 rounded-lg flex items-center justify-center">
// //                   <Factory className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />
// //                 </div>
// //                 <span className="text-xl md:text-2xl text-slate-50">
// //                   AtomOne Technologies
// //                 </span>
// //               </div>
// //               <p className="text-xs md:text-sm text-slate-400">
// //                 Precision in Every Cut, Excellence in Every Fold
// //               </p>
// //             </div>
// //             <div>
// //               <h3 className="text-lg md:text-xl mb-3 md:mb-4 text-slate-50">
// //                 Contact
// //               </h3>
// //               <p className="text-xs md:text-sm text-slate-400 mb-1 md:mb-2">
// //                 visheshgoyal@atomone.in
// //               </p>
// //               <p className="text-xs md:text-sm text-slate-400">
// //                 +91-9999761226
// //               </p>
// //             </div>
// //             <div>
// //               <h3 className="text-lg md:text-xl mb-3 md:mb-4 text-slate-50">
// //                 Locations
// //               </h3>
// //               <p className="text-xs md:text-sm text-slate-400 mb-1">
// //                 Gujarat Plant
// //               </p>
// //               <p className="text-xs md:text-sm text-slate-400">
// //                 Haryana Plant
// //               </p>
// //             </div>
// //           </div>
// //           <div className="mt-6 md:mt-8 pt-4 md:pt-8 border-t border-cyan-400/20 text-center text-[10px] md:text-sm text-slate-500">
// //             © 2025 AtomOne Technologies. All rights reserved.
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }



// import { useNavigate } from 'react-router-dom';
// import { Factory, Users, Target, Award, Shield, TrendingUp, Lightbulb, Heart, Eye, CheckCircle, Camera, Gauge, Database, Bell, Cpu, Wrench, ClipboardCheck, Cog, DollarSign, Globe, Zap } from 'lucide-react';

// export default function LandingPage() {
//   const navigate = useNavigate();

//   const coreValues = [
//     { icon: Lightbulb, label: 'Innovation', color: 'cyan' },
//     { icon: Award, label: 'Excellence', color: 'yellow' },
//     { icon: Shield, label: 'Integrity', color: 'cyan' },
//     { icon: Eye, label: 'Transparency', color: 'yellow' },
//     { icon: CheckCircle, label: 'Accountability', color: 'cyan' },
//     { icon: Heart, label: 'Social Responsibility', color: 'yellow' },
//   ];

//   const technologies = [
//     {
//       icon: Camera,
//       title: 'AI-Powered Visual Inspection',
//       description: 'Automated NG (Not Good) and OK part detection with AI camera system',
//       subtitle: 'Real-time quality verification on every machine',
//     },
//     {
//       icon: Gauge,
//       title: 'Real-Time Machine Intelligence',
//       description: 'Live monitoring: Shut Height, Tool ID, Machine Count',
//       subtitle: 'Instant email alerts for any parameter changes',
//     },
//     {
//       icon: Database,
//       title: 'Comprehensive Data Tracking',
//       description: 'Live counts: Machine-wise, Part-wise, Customer-wise',
//       subtitle: 'Complete visibility from everywhere, anytime',
//     },
//     {
//       icon: Bell,
//       title: 'Intelligent Alert System',
//       description: 'Automated email notifications for tool changes, height adjustments',
//       subtitle: 'Proactive maintenance alerts',
//     },
//   ];

//   const teams = [
//     { icon: Cpu, label: 'IT & IoT Team' },
//     { icon: Factory, label: 'Production Team' },
//     { icon: Wrench, label: 'Maintenance Team' },
//     { icon: ClipboardCheck, label: 'Quality Team' },
//     { icon: Cog, label: 'Tool Team' },
//   ];

//   const products = [
//     'Muffler Parts', 'Chassis Parts', 'Tubular Parts', 'Flanges',
//     'Busbars', 'Machined Parts', 'Draw Parts', 'Custom Components'
//   ];

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e293b] to-[#0f172a] overflow-hidden min-h-screen">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute top-20 left-10 w-72 h-72 bg-[#06b6d4] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
//             <div className="absolute top-40 right-10 w-72 h-72 bg-[#fbbf24] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
//             <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#10b981] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
//           </div>
//           <div className="absolute inset-0" style={{
//             backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(6, 182, 212, 0.03) 35px, rgba(6, 182, 212, 0.03) 70px), repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(251, 191, 36, 0.03) 35px, rgba(251, 191, 36, 0.03) 70px)'
//           }} />
//         </div>
        
//         <nav className="relative z-10 flex items-center justify-between px-8 py-6 backdrop-blur-sm">
//           <div className="flex items-center gap-3 group">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-gradient-to-r from-[#06b6d4] to-[#fbbf24] rounded-xl flex items-center justify-center shadow-lg shadow-[#06b6d4]/50 transform group-hover:scale-110 transition-transform duration-300">
//                 <Factory className="w-7 h-7 text-[#0f172a]" />
//               </div>
//               <span className="ml-3 text-3xl text-[#f1f5f9] tracking-tight">AtomOne</span>
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <button 
//               onClick={() => navigate('/login')}
//               className="px-8 py-3 bg-[#06b6d4]/10 backdrop-blur-sm border border-[#06b6d4] text-[#06b6d4] rounded-xl hover:bg-[#06b6d4] hover:text-[#0f172a] transition-all duration-300 hover:shadow-lg hover:shadow-[#06b6d4]/50 hover:scale-105"
//             >
//               Login to Dashboard
//             </button>
//             <button 
//               onClick={() => navigate('/signup')}
//               className="px-8 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0f172a] rounded-xl hover:shadow-2xl hover:shadow-[#fbbf24]/50 transition-all duration-300 hover:scale-105"
//             >
//               Sign Up
//             </button>
//           </div>
//         </nav>

//         <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 text-center">
//           <div className="mb-6 inline-block">
//             <span className="px-6 py-2 bg-[#06b6d4]/10 backdrop-blur-sm border border-[#06b6d4]/30 rounded-full text-[#06b6d4] text-sm animate-pulse">
//               🚀 Industry 4.0 Smart Factory Platform
//             </span>
//           </div>
//           <h1 className="text-7xl md:text-8xl mb-8 text-[#f1f5f9] tracking-tight leading-tight animate-fade-in-up">
//            Where Technology Speaks Louder,<br />
//             <span className="bg-gradient-to-r from-[#06b6d4] via-[#fbbf24] to-[#10b981] text-transparent bg-clip-text">
//               Every cut Delivers Perfection.
//             </span>
//           </h1>
//           <p className="text-2xl md:text-3xl text-[#94a3b8] mb-16 animate-fade-in-up animation-delay-200">
//             25+ Years of Metal Stamping Excellence | Industry 4.0 Leader
//           </p>
          
//           {/* Statistics Bar */}
//           <div className="flex flex-wrap justify-center gap-6 mt-20 animate-fade-in-up animation-delay-400">
//             <div className="group flex items-center gap-4 bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl px-8 py-6 rounded-2xl border border-[#06b6d4]/30 hover:border-[#06b6d4] transition-all duration-300 hover:shadow-2xl hover:shadow-[#06b6d4]/20 hover:scale-105">
//               <div className="p-3 bg-[#06b6d4]/10 rounded-xl group-hover:bg-[#06b6d4]/20 transition-all duration-300">
//                 <Users className="w-10 h-10 text-[#06b6d4]" />
//               </div>
//               <div className="text-left">
//                 <div className="text-4xl text-[#f1f5f9] mb-1">400+</div>
//                 <div className="text-sm text-[#94a3b8]">Employees</div>
//               </div>
//             </div>
//             <div className="group flex items-center gap-4 bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl px-8 py-6 rounded-2xl border border-[#fbbf24]/30 hover:border-[#fbbf24] transition-all duration-300 hover:shadow-2xl hover:shadow-[#fbbf24]/20 hover:scale-105">
//               <div className="p-3 bg-[#fbbf24]/10 rounded-xl group-hover:bg-[#fbbf24]/20 transition-all duration-300">
//                 <Factory className="w-10 h-10 text-[#fbbf24]" />
//               </div>
//               <div className="text-left">
//                 <div className="text-4xl text-[#f1f5f9] mb-1">3</div>
//                 <div className="text-sm text-[#94a3b8]">Manufacturing Units</div>
//               </div>
//             </div>
//             <div className="group flex items-center gap-4 bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl px-8 py-6 rounded-2xl border border-[#10b981]/30 hover:border-[#10b981] transition-all duration-300 hover:shadow-2xl hover:shadow-[#10b981]/20 hover:scale-105">
//               <div className="p-3 bg-[#10b981]/10 rounded-xl group-hover:bg-[#10b981]/20 transition-all duration-300">
//                 <Cog className="w-10 h-10 text-[#10b981]" />
//               </div>
//               <div className="text-left">
//                 <div className="text-4xl text-[#f1f5f9] mb-1">100+</div>
//                 <div className="text-sm text-[#94a3b8]">Presses (450T)</div>
//               </div>
//             </div>
//           </div>

//           {/* Scroll Indicator */}
//           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
//             <div className="w-6 h-10 border-2 border-[#06b6d4] rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-[#06b6d4] rounded-full mt-2 animate-pulse" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mission Section */}
//       {/* <div className="max-w-7xl mx-auto px-8 py-24">
//         <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-16 border border-[#06b6d4]/30 overflow-hidden shadow-2xl">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#06b6d4]/5 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fbbf24]/5 rounded-full blur-3xl" />
          
//           <div className="relative z-10">
//             <div className="text-center mb-12">
//               <span className="text-sm text-[#06b6d4] tracking-widest uppercase mb-4 block">Our Purpose</span>
//               <h2 className="text-5xl mb-6 text-[#f1f5f9]">Our Mission</h2>
//               <p className="text-2xl text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
//                 To deliver end-to-end solutions in metal stamping and sheet metal processing
//               </p>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               <div className="group text-center hover:scale-110 transition-all duration-300">
//                 <div className="w-20 h-20 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#06b6d4]/50 transition-all duration-300">
//                   <CheckCircle className="w-10 h-10 text-[#06b6d4]" />
//                 </div>
//                 <div className="text-lg text-[#f1f5f9]">Quality</div>
//               </div>
//               <div className="group text-center hover:scale-110 transition-all duration-300">
//                 <div className="w-20 h-20 bg-gradient-to-br from-[#fbbf24]/20 to-[#fbbf24]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#fbbf24]/50 transition-all duration-300">
//                   <Shield className="w-10 h-10 text-[#fbbf24]" />
//                 </div>
//                 <div className="text-lg text-[#f1f5f9]">Safety</div>
//               </div>
//               <div className="group text-center hover:scale-110 transition-all duration-300">
//                 <div className="w-20 h-20 bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#10b981]/50 transition-all duration-300">
//                   <DollarSign className="w-10 h-10 text-[#10b981]" />
//                 </div>
//                 <div className="text-lg text-[#f1f5f9]">Profitability</div>
//               </div>
//               <div className="group text-center hover:scale-110 transition-all duration-300">
//                 <div className="w-20 h-20 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#06b6d4]/50 transition-all duration-300">
//                   <Award className="w-10 h-10 text-[#06b6d4]" />
//                 </div>
//                 <div className="text-lg text-[#f1f5f9]">Integrity</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}

//     <div className="relative py-32 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
//         <div className="relative z-10 max-w-7xl mx-auto px-8">
//           <div className="grid md:grid-cols-2 gap-12">
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
//               <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-500">
//                 <div className="inline-flex items-center gap-3 px-5 py-2 bg-cyan-500/10 rounded-full mb-6">
//                   <Target className="w-5 h-5 text-cyan-500" />
//                   <span className="text-cyan-500 uppercase tracking-wider">Our Mission</span>
//                 </div>
//                 <h2 className="text-4xl mb-6 text-slate-100">Delivering Excellence</h2>
//                 <p className="text-xl text-slate-400 mb-8 leading-relaxed">
//                   To deliver end-to-end solutions in metal stamping and sheet metal processing with unwavering commitment to quality, safety, profitability, and integrity.
//                 </p>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
//                     <CheckCircle className="w-5 h-5 text-cyan-500" />
//                     <span className="text-slate-100">Quality First</span>
//                   </div>
//                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
//                     <Shield className="w-5 h-5 text-cyan-500" />
//                     <span className="text-slate-100">Safety Priority</span>
//                   </div>
//                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
//                     <DollarSign className="w-5 h-5 text-cyan-500" />
//                     <span className="text-slate-100">Profitable Growth</span>
//                   </div>
//                   <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
//                     <Award className="w-5 h-5 text-cyan-500" />
//                     <span className="text-slate-100">Integrity Always</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//       {/* Vision Section */}
//       <div className="max-w-7xl mx-auto px-8 py-16">
//         <div className="bg-gradient-to-r from-[#1e293b] to-[#1e3a8a] rounded-2xl p-12 border border-[#fbbf24]/20">
//           <h2 className="text-4xl mb-8 text-center text-[#f1f5f9]">Our Vision</h2>
//           <p className="text-2xl text-center text-[#f1f5f9] mb-12">
//             To be the preferred partner of OEMs and Tier 1 suppliers globally
//           </p>
//           <div className="grid grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-20 h-20 bg-[#fbbf24]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Globe className="w-10 h-10 text-[#fbbf24]" />
//               </div>
//               <div className="text-[#f1f5f9]">Global Reach</div>
//             </div>
//             <div className="text-center">
//               <div className="w-20 h-20 bg-[#fbbf24]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Cpu className="w-10 h-10 text-[#fbbf24]" />
//               </div>
//               <div className="text-[#f1f5f9]">Engineering Excellence</div>
//             </div>
//             <div className="text-center">
//               <div className="w-20 h-20 bg-[#fbbf24]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Target className="w-10 h-10 text-[#fbbf24]" />
//               </div>
//               <div className="text-[#f1f5f9]">Customer Satisfaction</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Core Values */}
//       <div className="max-w-7xl mx-auto px-8 py-16">
//         <h2 className="text-4xl mb-12 text-center text-[#f1f5f9]">Core Values</h2>
//         <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
//           {coreValues.map((value, index) => {
//             const Icon = value.icon;
//             const colorClass = value.color === 'cyan' ? 'text-[#06b6d4] bg-[#06b6d4]/10' : 'text-[#fbbf24] bg-[#fbbf24]/10';
//             return (
//               <div key={index} className="text-center">
//                 <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
//                   <Icon className="w-8 h-8" />
//                 </div>
//                 <div className="text-[#f1f5f9]">{value.label}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Advanced Technology Section */}
//       <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-24 overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06b6d4] rounded-full filter blur-3xl" />
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fbbf24] rounded-full filter blur-3xl" />
//         </div>
        
//         <div className="relative z-10 max-w-7xl mx-auto px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block mb-6">
//               <span className="px-6 py-3 bg-gradient-to-r from-[#06b6d4]/20 to-[#fbbf24]/20 backdrop-blur-sm border border-[#06b6d4]/30 rounded-full text-[#06b6d4] text-sm">
//                 ⚡ Powered by AI & IoT
//               </span>
//             </div>
//             <h2 className="text-5xl md:text-6xl mb-6 text-[#f1f5f9]">Industry 4.0 Smart Factory</h2>
//             <p className="text-2xl bg-gradient-to-r from-[#06b6d4] to-[#fbbf24] text-transparent bg-clip-text">Advanced Monitoring System</p>
//           </div>
          
//           <div className="grid md:grid-cols-2 gap-8">
//             {technologies.map((tech, index) => {
//               const Icon = tech.icon;
//               return (
//                 <div key={index} className="group relative bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl rounded-2xl p-8 border border-[#06b6d4]/20 hover:border-[#06b6d4] transition-all duration-500 hover:shadow-2xl hover:shadow-[#06b6d4]/20 hover:scale-105">
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/0 to-[#06b6d4]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                   <div className="relative flex items-start gap-5">
//                     <div className="p-4 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#06b6d4]/20">
//                       <Icon className="w-8 h-8 text-[#06b6d4]" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl mb-3 text-[#f1f5f9] group-hover:text-[#06b6d4] transition-colors duration-300">{tech.title}</h3>
//                       <p className="text-[#94a3b8] mb-3 leading-relaxed">{tech.description}</p>
//                       <p className="text-[#06b6d4] flex items-center gap-2">
//                         <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full animate-pulse" />
//                         {tech.subtitle}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Team Excellence */}
//       <div className="max-w-7xl mx-auto px-8 py-16">
//         <h2 className="text-4xl mb-12 text-center text-[#f1f5f9]">Our Expert Teams</h2>
//         <div className="grid grid-cols-5 gap-6">
//           {teams.map((team, index) => {
//             const Icon = team.icon;
//             return (
//               <div key={index} className="bg-[#1e293b] rounded-xl p-6 text-center border border-[#06b6d4]/20 hover:border-[#fbbf24] transition-colors">
//                 <div className="w-16 h-16 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Icon className="w-8 h-8 text-[#06b6d4]" />
//                 </div>
//                 <div className="text-[#f1f5f9]">{team.label}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

      
//       <div className="max-w-7xl mx-auto px-8 py-24">
//         <div className="relative bg-gradient-to-r from-[#1e3a8a] via-[#1e293b] to-[#1e3a8a] rounded-3xl p-16 border-2 border-[#fbbf24]/40 overflow-hidden shadow-2xl">
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
          
//           <div className="relative z-10">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24] text-transparent bg-clip-text">
//                 Digital Transformation Impact
//               </h2>
//               <p className="text-[#94a3b8] text-lg">Measurable results from our Industry 4.0 implementation</p>
//             </div>
//             <div className="grid md:grid-cols-4 gap-10">
//               <div className="group text-center transform hover:scale-110 transition-all duration-300">
//                 <div className="mb-6 relative">
//                   <div className="absolute inset-0 bg-[#10b981]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
//                   <div className="relative text-6xl md:text-7xl bg-gradient-to-br from-[#10b981] to-[#059669] text-transparent bg-clip-text">
//                     15-20%
//                   </div>
//                 </div>
//                 <div className="text-[#f1f5f9] mb-2">Machine Utilization</div>
//                 <div className="text-[#94a3b8] text-sm">Increment</div>
//               </div>
//               <div className="group text-center transform hover:scale-110 transition-all duration-300">
//                 <div className="mb-6 relative">
//                   <div className="absolute inset-0 bg-[#10b981]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
//                   <div className="relative text-6xl md:text-7xl bg-gradient-to-br from-[#10b981] to-[#059669] text-transparent bg-clip-text">
//                     8-12%
//                   </div>
//                 </div>
//                 <div className="text-[#f1f5f9] mb-2">Operator Efficiency</div>
//                 <div className="text-[#94a3b8] text-sm">Increase</div>
//               </div>
//               <div className="group text-center transform hover:scale-110 transition-all duration-300">
//                 <div className="mb-6 relative">
//                   <div className="absolute inset-0 bg-[#10b981]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
//                   <div className="relative text-6xl md:text-7xl bg-gradient-to-br from-[#10b981] to-[#059669] text-transparent bg-clip-text">
//                     10-15%
//                   </div>
//                 </div>
//                 <div className="text-[#f1f5f9] mb-2">Quality</div>
//                 <div className="text-[#94a3b8] text-sm">Improvement</div>
//               </div>
//               <div className="group text-center transform hover:scale-110 transition-all duration-300">
//                 <div className="mb-4 relative">
//                   <div className="flex items-center justify-center">
//                     <div className="p-6 bg-gradient-to-br from-[#fbbf24]/20 to-[#fbbf24]/5 rounded-2xl group-hover:shadow-lg group-hover:shadow-[#fbbf24]/50 transition-all duration-300">
//                       <Zap className="w-16 h-16 text-[#fbbf24]" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-[#f1f5f9] mb-2">Real-time Data</div>
//                 <div className="text-[#94a3b8] text-sm">Visibility</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Showcase */}
//       <div className="max-w-7xl mx-auto px-8 py-16">
//         <h2 className="text-4xl mb-12 text-center text-[#f1f5f9]">Our Products</h2>
//         <div className="grid grid-cols-4 gap-6">
//           {products.map((product, index) => (
//             <div key={index} className="bg-[#1e293b] rounded-xl p-6 text-center border border-[#06b6d4]/20 hover:border-[#fbbf24] transition-colors">
//               <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-[#06b6d4]/10' : 'bg-[#fbbf24]/10'} rounded-lg flex items-center justify-center mx-auto mb-4`}>
//                 <Cog className={`w-6 h-6 ${index % 2 === 0 ? 'text-[#06b6d4]' : 'text-[#fbbf24]'}`} />
//               </div>
//               <div className="text-[#f1f5f9]">{product}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#1e293b] border-t border-[#06b6d4]/20">
//         <div className="max-w-7xl mx-auto px-8 py-12">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-gradient-to-r from-[#06b6d4] to-[#fbbf24] rounded-lg flex items-center justify-center">
//                   <Factory className="w-6 h-6 text-[#0f172a]" />
//                 </div>
//                 <span className="text-2xl text-[#f1f5f9]">AtomOne Technologies</span>
//               </div>
//               <p className="text-[#94a3b8]">Precision in Every Cut, Excellence in Every Fold</p>
//             </div>
//             <div>
//               <h3 className="text-xl mb-4 text-[#f1f5f9]">Contact</h3>
//               <p className="text-[#94a3b8] mb-2">visheshgoyal@atomone.in</p>
//               <p className="text-[#94a3b8]">+91-9999761226</p>
//             </div>
//             <div>
//               <h3 className="text-xl mb-4 text-[#f1f5f9]">Locations</h3>
//               <p className="text-[#94a3b8] mb-2">Gujarat Plant</p>
//               <p className="text-[#94a3b8]">Haryana Plant</p>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-[#06b6d4]/20 text-center text-[#94a3b8]">
//             <p>&copy; 2025 AtomOne Technologies. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }





import { useNavigate } from 'react-router-dom';
import { Factory, Users, Target, Award, Shield, Lightbulb, Heart, Eye, CheckCircle, Camera, Gauge, Database, Bell, Cpu, Wrench, ClipboardCheck, Cog, DollarSign, Globe, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const coreValues = [
    { icon: Lightbulb, label: 'Innovation', color: 'cyan' },
    { icon: Award, label: 'Excellence', color: 'yellow' },
    { icon: Shield, label: 'Integrity', color: 'cyan' },
    { icon: Eye, label: 'Transparency', color: 'yellow' },
    { icon: CheckCircle, label: 'Accountability', color: 'cyan' },
    { icon: Heart, label: 'Social Responsibility', color: 'yellow' },
  ];

  const technologies = [
    {
      icon: Camera,
      title: 'AI-Powered Visual Inspection',
      description: 'Automated NG (Not Good) and OK part detection with AI camera system',
      subtitle: 'Real-time quality verification on every machine',
    },
    {
      icon: Gauge,
      title: 'Real-Time Machine Intelligence',
      description: 'Live monitoring: Shut Height, Tool ID, Machine Count',
      subtitle: 'Instant email alerts for any parameter changes',
    },
    {
      icon: Database,
      title: 'Comprehensive Data Tracking',
      description: 'Live counts: Machine-wise, Part-wise, Customer-wise',
      subtitle: 'Complete visibility from everywhere, anytime',
    },
    {
      icon: Bell,
      title: 'Intelligent Alert System',
      description: 'Automated email notifications for tool changes, height adjustments',
      subtitle: 'Proactive maintenance alerts',
    },
  ];

  const teams = [
    { icon: Cpu, label: 'IT & IoT Team' },
    { icon: Factory, label: 'Production Team' },
    { icon: Wrench, label: 'Maintenance Team' },
    { icon: ClipboardCheck, label: 'Quality Team' },
    { icon: Cog, label: 'Tool Team' },
  ];

  const products = [
    'Muffler Parts', 'Chassis Parts', 'Tubular Parts', 'Flanges',
    'Busbars', 'Machined Parts', 'Draw Parts', 'Custom Components'
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1e3a8a] via-[#1e293b] to-[#0f172a] overflow-hidden min-h-screen">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#06b6d4] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-[#fbbf24] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[#10b981] rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
          </div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(6, 182, 212, 0.03) 35px, rgba(6, 182, 212, 0.03) 70px), repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(251, 191, 36, 0.03) 35px, rgba(251, 191, 36, 0.03) 70px)'
          }} />
        </div>
        
        <nav className="relative z-10 flex items-center justify-between px-8 py-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#06b6d4] to-[#fbbf24] rounded-xl flex items-center justify-center shadow-lg shadow-[#06b6d4]/50 transform group-hover:scale-110 transition-transform duration-300">
                <Factory className="w-7 h-7 text-[#0f172a]" />
              </div>
              <span className="ml-3 text-3xl text-[#f1f5f9] tracking-tight">AtomOne</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-[#06b6d4]/10 backdrop-blur-sm border border-[#06b6d4] text-[#06b6d4] rounded-xl hover:bg-[#06b6d4] hover:text-[#0f172a] transition-all duration-300 hover:shadow-lg hover:shadow-[#06b6d4]/50 hover:scale-105"
            >
              Login to Dashboard
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#0f172a] rounded-xl hover:shadow-2xl hover:shadow-[#fbbf24]/50 transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 text-center">
          <div className="mb-6 inline-block">
            <span className="px-6 py-2 bg-[#06b6d4]/10 backdrop-blur-sm border border-[#06b6d4]/30 rounded-full text-[#06b6d4] text-sm animate-pulse">
              🚀 Industry 4.0 Smart Factory Platform
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl mb-8 text-[#f1f5f9] tracking-tight leading-tight animate-fade-in-up">
            Where Technology Speaks Louder,<br />
            <span className="bg-gradient-to-r from-[#06b6d4] via-[#fbbf24] to-[#10b981] text-transparent bg-clip-text">
              Every cut Delivers Perfection.
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-[#94a3b8] mb-16 animate-fade-in-up animation-delay-200">
            25+ Years of Metal Stamping Excellence | Industry 4.0 Leader
          </p>
          
          {/* Statistics Bar */}
          <div className="flex flex-wrap justify-center gap-6 mt-20 animate-fade-in-up animation-delay-400">
            <div className="group flex items-center gap-4 bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl px-8 py-6 rounded-2xl border border-[#06b6d4]/30 hover:border-[#06b6d4] transition-all duration-300 hover:shadow-2xl hover:shadow-[#06b6d4]/20 hover:scale-105">
              <div className="p-3 bg-[#06b6d4]/10 rounded-xl group-hover:bg-[#06b6d4]/20 transition-all duration-300">
                <Users className="w-10 h-10 text-[#06b6d4]" />
              </div>
              <div className="text-left">
                <div className="text-4xl text-[#f1f5f9] mb-1">400+</div>
                <div className="text-sm text-[#94a3b8]">Employees</div>
              </div>
            </div>
            <div className="group flex items-center gap-4 bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl px-8 py-6 rounded-2xl border border-[#fbbf24]/30 hover:border-[#fbbf24] transition-all duration-300 hover:shadow-2xl hover:shadow-[#fbbf24]/20 hover:scale-105">
              <div className="p-3 bg-[#fbbf24]/10 rounded-xl group-hover:bg-[#fbbf24]/20 transition-all duration-300">
                <Factory className="w-10 h-10 text-[#fbbf24]" />
              </div>
              <div className="text-left">
                <div className="text-4xl text-[#f1f5f9] mb-1">3</div>
                <div className="text-sm text-[#94a3b8]">Manufacturing Units</div>
              </div>
            </div>
            <div className="group flex items-center gap-4 bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl px-8 py-6 rounded-2xl border border-[#10b981]/30 hover:border-[#10b981] transition-all duration-300 hover:shadow-2xl hover:shadow-[#10b981]/20 hover:scale-105">
              <div className="p-3 bg-[#10b981]/10 rounded-xl group-hover:bg-[#10b981]/20 transition-all duration-300">
                <Cog className="w-10 h-10 text-[#10b981]" />
              </div>
              <div className="text-left">
                <div className="text-4xl text-[#f1f5f9] mb-1">100+</div>
                <div className="text-sm text-[#94a3b8]">Presses (450T)</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-[#06b6d4] rounded-full flex justify-center">
              <div className="w-1 h-3 bg-[#06b6d4] rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section (UPAR) */}
      <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#fbbf24] rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-8 border border-[#fbbf24]/30 hover:border-[#fbbf24] transition-all duration-500">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-[#fbbf24]/20 to-[#fbbf24]/5 rounded-xl flex-shrink-0">
                <Globe className="w-10 h-10 text-[#fbbf24]" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fbbf24]/10 rounded-full mb-3">
                  <span className="text-[#fbbf24] uppercase tracking-wider text-xs">Our Vision</span>
                </div>
                <h2 className="text-3xl mb-3 text-[#f1f5f9]">Global Partnership</h2>
                <p className="text-lg text-[#94a3b8] mb-4">
                  To be the preferred partner of OEMs and Tier 1 suppliers globally through excellence and innovation.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <Globe className="w-4 h-4 text-[#fbbf24]" />
                    <span className="text-sm text-[#f1f5f9]">Global Reach</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <Cpu className="w-4 h-4 text-[#fbbf24]" />
                    <span className="text-sm text-[#f1f5f9]">Engineering Excellence</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <Target className="w-4 h-4 text-[#fbbf24]" />
                    <span className="text-sm text-[#f1f5f9]">Customer Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section (NICHE) */}
      <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06b6d4] rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl rounded-3xl p-8 border border-[#06b6d4]/30 hover:border-[#06b6d4] transition-all duration-500">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-xl flex-shrink-0">
                <Target className="w-10 h-10 text-[#06b6d4]" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#06b6d4]/10 rounded-full mb-3">
                  <span className="text-[#06b6d4] uppercase tracking-wider text-xs">Our Mission</span>
                </div>
                <h2 className="text-3xl mb-3 text-[#f1f5f9]">Delivering Excellence</h2>
                <p className="text-lg text-[#94a3b8] mb-4">
                  To deliver end-to-end solutions in metal stamping and sheet metal processing with unwavering commitment to quality, safety, profitability, and integrity.
                </p>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-[#06b6d4]" />
                    <span className="text-sm text-[#f1f5f9]">Quality First</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <Shield className="w-4 h-4 text-[#06b6d4]" />
                    <span className="text-sm text-[#f1f5f9]">Safety Priority</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <DollarSign className="w-4 h-4 text-[#06b6d4]" />
                    <span className="text-sm text-[#f1f5f9]">Profitable Growth</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                    <Award className="w-4 h-4 text-[#06b6d4]" />
                    <span className="text-sm text-[#f1f5f9]">Integrity Always</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl mb-12 text-center text-[#f1f5f9]">Core Values</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              const colorClass = value.color === 'cyan' ? 'text-[#06b6d4] bg-[#06b6d4]/10' : 'text-[#fbbf24] bg-[#fbbf24]/10';
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-[#f1f5f9]">{value.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advanced Technology Section */}
      <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06b6d4] rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#fbbf24] rounded-full filter blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-[#06b6d4]/20 to-[#fbbf24]/20 backdrop-blur-sm border border-[#06b6d4]/30 rounded-full text-[#06b6d4] text-sm">
                ⚡ Powered by AI & IoT
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl mb-6 text-[#f1f5f9]">Industry 4.0 Smart Factory</h2>
            <p className="text-2xl bg-gradient-to-r from-[#06b6d4] to-[#fbbf24] text-transparent bg-clip-text">Advanced Monitoring System</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="group relative bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/40 backdrop-blur-xl rounded-2xl p-8 border border-[#06b6d4]/20 hover:border-[#06b6d4] transition-all duration-500 hover:shadow-2xl hover:shadow-[#06b6d4]/20 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/0 to-[#06b6d4]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start gap-5">
                    <div className="p-4 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#06b6d4]/20">
                      <Icon className="w-8 h-8 text-[#06b6d4]" />
                    </div>
                    <div>
                      <h3 className="text-2xl mb-3 text-[#f1f5f9] group-hover:text-[#06b6d4] transition-colors duration-300">{tech.title}</h3>
                      <p className="text-[#94a3b8] mb-3 leading-relaxed">{tech.description}</p>
                      <p className="text-[#06b6d4] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full animate-pulse" />
                        {tech.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Excellence */}
      <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl mb-12 text-center text-[#f1f5f9]">Our Expert Teams</h2>
          <div className="grid grid-cols-5 gap-6">
            {teams.map((team, index) => {
              const Icon = team.icon;
              return (
                <div key={index} className="bg-[#1e293b] rounded-xl p-6 text-center border border-[#06b6d4]/20 hover:border-[#fbbf24] transition-colors">
                  <div className="w-16 h-16 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#06b6d4]" />
                  </div>
                  <div className="text-[#f1f5f9]">{team.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Digital Impact */}
      <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="relative bg-gradient-to-r from-[#1e3a8a] via-[#1e293b] to-[#1e3a8a] rounded-3xl p-16 border-2 border-[#fbbf24]/40 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent" />
            
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#fbbf24] via-[#fcd34d] to-[#fbbf24] text-transparent bg-clip-text">
                  Digital Transformation Impact
                </h2>
                <p className="text-[#94a3b8] text-lg">Measurable results from our Industry 4.0 implementation</p>
              </div>
              <div className="grid md:grid-cols-4 gap-10">
                <div className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-[#10b981]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative text-6xl md:text-7xl bg-gradient-to-br from-[#10b981] to-[#059669] text-transparent bg-clip-text">
                      15-20%
                    </div>
                  </div>
                  <div className="text-[#f1f5f9] mb-2">Machine Utilization</div>
                  <div className="text-[#94a3b8] text-sm">Increment</div>
                </div>
                <div className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-[#10b981]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative text-6xl md:text-7xl bg-gradient-to-br from-[#10b981] to-[#059669] text-transparent bg-clip-text">
                      8-12%
                    </div>
                  </div>
                  <div className="text-[#f1f5f9] mb-2">Operator Efficiency</div>
                  <div className="text-[#94a3b8] text-sm">Increase</div>
                </div>
                <div className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-[#10b981]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative text-6xl md:text-7xl bg-gradient-to-br from-[#10b981] to-[#059669] text-transparent bg-clip-text">
                      10-15%
                    </div>
                  </div>
                  <div className="text-[#f1f5f9] mb-2">Quality</div>
                  <div className="text-[#94a3b8] text-sm">Improvement</div>
                </div>
                <div className="group text-center transform hover:scale-110 transition-all duration-300">
                  <div className="mb-4 relative">
                    <div className="flex items-center justify-center">
                      <div className="p-6 bg-gradient-to-br from-[#fbbf24]/20 to-[#fbbf24]/5 rounded-2xl group-hover:shadow-lg group-hover:shadow-[#fbbf24]/50 transition-all duration-300">
                        <Zap className="w-16 h-16 text-[#fbbf24]" />
                      </div>
                    </div>
                  </div>
                  <div className="text-[#f1f5f9] mb-2">Real-time Data</div>
                  <div className="text-[#94a3b8] text-sm">Visibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Showcase */}
      <div className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl mb-12 text-center text-[#f1f5f9]">Our Products</h2>
          <div className="grid grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-[#1e293b] rounded-xl p-6 text-center border border-[#06b6d4]/20 hover:border-[#fbbf24] transition-colors">
                <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-[#06b6d4]/10' : 'bg-[#fbbf24]/10'} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <Cog className={`w-6 h-6 ${index % 2 === 0 ? 'text-[#06b6d4]' : 'text-[#fbbf24]'}`} />
                </div>
                <div className="text-[#f1f5f9]">{product}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e293b] border-t border-[#06b6d4]/20">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#06b6d4] to-[#fbbf24] rounded-lg flex items-center justify-center">
                  <Factory className="w-6 h-6 text-[#0f172a]" />
                </div>
                <span className="text-2xl text-[#f1f5f9]">AtomOne Technologies</span>
              </div>
              <p className="text-[#94a3b8]">Precision in Every Cut, Excellence in Every Fold</p>
            </div>
            <div>
              <h3 className="text-xl mb-4 text-[#f1f5f9]">Contact</h3>
              <p className="text-[#94a3b8] mb-2">visheshgoyal@atomone.in</p>
              <p className="text-[#94a3b8]">+91-9999761226</p>
            </div>
            <div>
              <h3 className="text-xl mb-4 text-[#f1f5f9]">Locations</h3>
              <p className="text-[#94a3b8] mb-2">Gujarat Plant</p>
              <p className="text-[#94a3b8]">Haryana Plant</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#06b6d4]/20 text-center text-[#94a3b8]">
            <p>&copy; 2025 AtomOne Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
