import { motion } from "framer-motion";
import { itemVariants } from "../../utils/animation";

export const MiniCardBento = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      variants={itemVariants}
    >
      {[
        { label: "Aplicaciones", value: "12", icon: "📝" },
        { label: "Vistas de perfil", value: "324", icon: "👁️" },
        { label: "Ofertas recibidas", value: "3", icon: "🎯" },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
