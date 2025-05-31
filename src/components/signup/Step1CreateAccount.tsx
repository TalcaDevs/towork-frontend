import React, { use, useState } from "react";
import { motion } from "framer-motion";
import Input from "../Input";
import Button from "../Button";
import { AuthService } from "../../services";
import {
  Step1Props,
  RegistrationFormErrors,
} from "../../interfaces/signup.interface";
import { validateRegistrationForm } from "../../utils/validation";
import {
  containerVariants,
  itemVariants,
  errorVariants,
} from "../../utils/animation";
import { successMessages } from "../../data/successMessages";
import { errorMessages } from "../../data/errorMessages";
import EmailIcon from "../../assets/icons/EmailIcon";
import LockIcon from "../../assets/icons/LockIcon";
import ErrorIcon from "../../assets/icons/ErrorIcon";
import CorrectIcon from "../../assets/icons/CorrectIcon";

const Step1CreateAccount: React.FC<Step1Props> = ({
  userData,
  updateUserData,
  nextStep,
  loading,
  error,
  setLoading,
  setError,
  setSuccess,
}) => {
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formErrors, setFormErrors] = useState<RegistrationFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    updateUserData({ [name]: value });

    if (formErrors[name as keyof RegistrationFormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      });
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);

    if (formErrors.password_confirm) {
      setFormErrors({
        ...formErrors,
        password_confirm: undefined,
      });
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    updateUserData({ terms_accepted: isChecked });

    if (formErrors.terms_accepted) {
      setFormErrors({
        ...formErrors,
        terms_accepted: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    const validation = validateRegistrationForm(
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password,
      passwordConfirm,
      userData.terms_accepted
    );

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.signUp({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        terms_accepted: userData.terms_accepted,
      });

      if (response.access && response.refresh) {
        setSuccess(response.message || successMessages.accountCreated);
        nextStep();
      } else {
        setError(response.message || errorMessages.emailUsed);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(errorMessages.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-5 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={itemVariants}>
            <Input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Juan "
              label="Nombres"
              value={userData.first_name}
              onChange={handleChange}
              required
              error={formErrors.first_name}
              className="w-full"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Pérez"
              label="Apellidos"
              value={userData.last_name}
              onChange={handleChange}
              required
              error={formErrors.last_name}
              className="w-full"
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Input
            id="email"
            className="pl-12"
            name="email"
            type="email"
            placeholder="tu@ejemplo.com"
            label="Email"
            value={userData.email}
            onChange={handleChange}
            required
            error={formErrors.email}
            icon={
              <div className="flex items-center border-r border-blue-500 pr-2 mr-2">
                <EmailIcon />
              </div>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            id="password"
            className="pl-12"
            name="password"
            type="password"
            placeholder="Contraseña (mínimo 8 caracteres)"
            label="Contraseña"
            value={userData.password}
            onChange={handleChange}
            required
            error={formErrors.password}
            icon={
              <div className="flex items-center border-r border-blue-500 pr-2 mr-2">
                <LockIcon />
              </div>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            id="password_confirm"
            className="pl-12"
            name="password_confirm"
            type="password"
            placeholder="Confirmar contraseña"
            label="Confirmar contraseña"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            required
            error={formErrors.password_confirm}
            icon={
              <div className="flex items-center border-r border-blue-500 pr-2 mr-2">
                <LockIcon />
              </div>
            }
          />
        </motion.div>

        {/* Nueva sección de términos y condiciones */}
        <motion.div variants={itemVariants} className="mt-6">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
              <input
                id="terms_accepted"
                name="terms_accepted"
                type="checkbox"
                checked={userData.terms_accepted || false}
                onChange={handleTermsChange}
                className={`w-4 h-4 rounded border-2 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-colors ${
                  formErrors.terms_accepted
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
            </div>
            <div className="text-sm">
              <label htmlFor="terms_accepted" className="text-gray-700">
                Acepto los{" "}
                <a
                  href="/terms-of-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  términos de servicio
                </a>{" "}
                y la{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  política de privacidad
                </a>
              </label>
            </div>
          </div>

          {formErrors.terms_accepted && (
            <motion.div
              className="mt-2 flex items-center text-red-600 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorIcon />
              <span className="ml-1">{formErrors.terms_accepted}</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {error && (
        <motion.div
          className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm"
          {...errorVariants}
        >
          <div className="flex items-center">
            <ErrorIcon />
            {errorMessages.termsNotAccepted}
          </div>
        </motion.div>
      )}

      <motion.div className="mt-8" variants={itemVariants}>
        <Button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <CorrectIcon />
              Creando cuenta...
            </div>
          ) : (
            "Crear cuenta"
          )}
        </Button>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿Ya tienes una cuenta? </span>
          <motion.a
            href="/signin"
            className="text-blue-500 hover:text-blue-600 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar sesión
          </motion.a>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default Step1CreateAccount;
