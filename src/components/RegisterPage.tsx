import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, Plus } from "lucide-react";
import olympicPoolImg from "../assets/images/olympic_pool_5lanes_1784711486001.jpg";
import brightSwimmerBgImg from "../assets/images/bright_swimmer_bg_1784780224088.jpg";
import { useLanguage } from "../i18n/LanguageContext";

type Category = "individual" | "adults" | "kids-fitness" | "swimming-school" | "group";

const categoryOrder: Category[] = ["individual", "adults", "kids-fitness", "swimming-school", "group"];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const durationOptions = ["1 Month", "3 Months", "6 Months", "12 Months"];
const adultsFrequencyOptions = ["1x / Week", "2x / Week", "3x / Week", "Unlimited"];
const kidsFrequencyOptions = ["1x / Week", "2x / Week", "3x / Week"];
const kidsTimeOptions = ["09:00", "12:00", "16:00", "18:00", "19:00"];
const swimEntryOptions = ["2 Entries/Week - 8 Entries/Month", "3 Entries/Week - 12 Entries/Month", "Unlimited Entries"];
const swimLevelOptions = ["Male (Beginner)", "Male (Advanced)", "Female (Beginner)", "Female (Advanced)"];
const individualEntryOptions = ["2 Entries/Week - 8 Entries/Month", "3 Entries/Week - 12 Entries/Month", "Unlimited Entries"];
const groupOfferOptions = ["Pool Usage (2.5€/person)", "Pool Usage + Locker (3.5€/person)", "Full Day Access (5€/person)"];
const swimmingSkillOptions = ["Can't swim", "Can swim a little", "Can swim well"];

const adultsPriceMap: Record<string, number> = { "1x / Week": 35, "2x / Week": 48, "3x / Week": 60, "Unlimited": 80 };
const kidsPriceMap: Record<string, number> = { "1x / Week": 18, "2x / Week": 30, "3x / Week": 40 };
const swimEntriesPriceMap: Record<string, number> = {
  "2 Entries/Week - 8 Entries/Month": 50,
  "3 Entries/Week - 12 Entries/Month": 65,
  "Unlimited Entries": 85,
};
const individualEntriesPriceMap: Record<string, number> = {
  "2 Entries/Week - 8 Entries/Month": 40,
  "3 Entries/Week - 12 Entries/Month": 50,
  "Unlimited Entries": 60,
};
const groupOfferPriceMap: Record<string, number> = {
  "Pool Usage (2.5€/person)": 2.5,
  "Pool Usage + Locker (3.5€/person)": 3.5,
  "Full Day Access (5€/person)": 5,
};

const formatPrice = (n: number) => {
  const rounded = Math.round(n * 100) / 100;
  return `${rounded % 1 === 0 ? rounded : rounded.toFixed(2)}€`;
};

const parseMaxDays = (frequency: string): number => {
  if (frequency.toLowerCase().includes("unlimited")) return 6;
  const match = frequency.match(/(\d+)x/);
  return match ? parseInt(match[1], 10) : 6;
};

const toggleDay = (days: string[], day: string, max: number): string[] => {
  if (days.includes(day)) return days.filter((d) => d !== day);
  if (days.length >= max) return days;
  return [...days, day];
};

interface MemberInfo {
  firstName: string;
  parentName: string;
  lastName: string;
  dob: string;
  age: string;
  childAge: string;
  address: string;
  phone: string;
  email: string;
  swimmingSkill: string;
  healthProblem: "" | "yes" | "no";
  healthDescription: string;
}

const emptyMember = (): MemberInfo => ({
  firstName: "",
  parentName: "",
  lastName: "",
  dob: "",
  age: "",
  childAge: "",
  address: "",
  phone: "",
  email: "",
  swimmingSkill: "",
  healthProblem: "",
  healthDescription: "",
});

const inputClass =
  "w-full h-11 px-4 rounded-xl border border-slate-200 bg-white/90 text-slate-800 placeholder-slate-400 font-normal text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300 shadow-sm";
const selectClass =
  "w-full h-11 px-3 rounded-xl border border-slate-200 bg-white/90 text-slate-800 font-normal text-xs focus:border-sky-500 focus:outline-none transition-all duration-300 cursor-pointer shadow-sm";
const labelClass = "text-[10px] font-semibold uppercase text-slate-600 tracking-wider mb-1.5 block";
const toggleBtnClass = (active: boolean) =>
  `px-3 py-2 rounded-lg border text-[10px] font-medium uppercase tracking-wide transition-colors ${
    active ? "bg-sky-500 border-sky-500 text-white font-bold shadow-sm" : "border-slate-200 text-slate-600 hover:border-sky-300 bg-white/70"
  }`;
const planCardClass = "rounded-2xl border border-white/90 bg-white/85 backdrop-blur-xl p-5 shadow-lg space-y-4 text-slate-800";

export const RegisterPage: React.FC = () => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<Category>("individual");
  const [agree, setAgree] = useState(false);
  const isGroup = category === "group";
  const [step, setStep] = useState<1 | 2>(1);

  const [members, setMembers] = useState<MemberInfo[]>([emptyMember()]);
  useEffect(() => {
    setMembers([emptyMember()]);
    setStep(1);
  }, [category]);

  const updateMember = (idx: number, patch: Partial<MemberInfo>) => {
    setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, ...patch } : m)));
  };
  const addMember = () => setMembers((prev) => [...prev, emptyMember()]);

  const [groupForm, setGroupForm] = useState({
    institution: "",
    address: "",
    email: "",
    phone: "",
    responsiblePerson: "",
    time: "",
    numberOfPeople: "",
    age: "",
    males: "",
    females: "",
    offer: groupOfferOptions[0],
  });
  const [groupDates, setGroupDates] = useState<string[]>([""]);
  const updateGroupDate = (idx: number, value: string) => {
    setGroupDates((prev) => prev.map((d, i) => (i === idx ? value : d)));
  };
  const addGroupDate = () => setGroupDates((prev) => [...prev, ""]);
  const groupTotal = groupOfferPriceMap[groupForm.offer] * (parseFloat(groupForm.numberOfPeople) || 0);

  const [adultsPlan, setAdultsPlan] = useState({
    frequency: adultsFrequencyOptions[2],
    duration: durationOptions[0],
    days: ["Monday", "Wednesday", "Friday"] as string[],
  });
  const adultsMaxDays = parseMaxDays(adultsPlan.frequency);
  const adultsPrice = adultsPriceMap[adultsPlan.frequency];

  const [kidsPlan, setKidsPlan] = useState({
    frequency: kidsFrequencyOptions[1],
    time: kidsTimeOptions[3],
    days: ["Monday", "Wednesday"] as string[],
  });
  const kidsMaxDays = parseMaxDays(kidsPlan.frequency);
  const kidsPrice = kidsPriceMap[kidsPlan.frequency];

  const [swimCards, setSwimCards] = useState([
    { label: "Standard Plan", duration: durationOptions[0], entries: swimEntryOptions[0], discount: 0 },
    { label: "Sibling Discount", duration: durationOptions[0], entries: swimEntryOptions[0], discount: 0.1 },
    { label: "By Level", duration: durationOptions[0], entries: swimEntryOptions[0], level: swimLevelOptions[3], discount: 0 },
  ]);
  const updateSwimCard = (idx: number, patch: Partial<(typeof swimCards)[number]>) => {
    setSwimCards((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  };

  const [individualCards, setIndividualCards] = useState<{ duration: string; entries: string }[]>([
    { duration: durationOptions[0], entries: "" },
    { duration: durationOptions[0], entries: "Unlimited Entries" },
  ]);
  const updateIndividualCard = (idx: number, patch: Partial<{ duration: string; entries: string }>) => {
    setIndividualCards((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleNext = () => {
    const first = members[0];
    if (!first.firstName || !first.lastName || !first.phone || !first.email) {
      alert(t("register.alertRequired"));
      return;
    }
    setStep(2);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isGroup && step === 1) {
      handleNext();
      return;
    }
    if (!agree) {
      alert(t("register.alertTerms"));
      return;
    }
    if (category === "group") {
      if (!groupForm.institution || !groupForm.email || !groupForm.phone || !groupForm.responsiblePerson) {
        alert(t("register.alertRequired"));
        return;
      }
    } else {
      const first = members[0];
      if (!first.firstName || !first.lastName || !first.phone || !first.email) {
        alert(t("register.alertRequired"));
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        category === "group"
          ? t("register.successGroup", { email: groupForm.email })
          : t("register.successOther", { category: t(category) })
      );
      setIsSuccess(true);
      setAgree(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative text-slate-800 pt-24 pb-16 px-6 flex flex-col justify-center overflow-hidden">
      {/* Background Swimmer Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={brightSwimmerBgImg}
          alt="Swimmer Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-sky-900/15 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-5xl w-full mx-auto my-auto relative z-10">
        {/* Register Page Card - Light Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 md:p-10 rounded-3xl border border-white/80 bg-white/80 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Decorative glowing background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-300/30 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/30 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="register-form-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Page Heading */}
                <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-slate-900 text-center mb-8">
                  {t("register.heading")}
                </h1>

                <motion.form
                  onSubmit={handleRegisterSubmit}
                  className="space-y-8 text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category selector */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                      {t("register.chooseCategory")}
                    </p>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className={selectClass + " w-auto min-w-[200px]"}
                    >
                      {categoryOrder.map((c) => (
                        <option key={c} value={c}>
                          {t(c)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {!isGroup && (
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-colors ${
                            step >= 1 ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          1
                        </span>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider ${
                            step === 1 ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {t("register.step1Title")}
                        </span>
                      </div>
                      <div className="h-px w-10 bg-slate-300" />
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-colors ${
                            step >= 2 ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          2
                        </span>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider ${
                            step === 2 ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {t("register.step2Title")}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className={isGroup ? "grid grid-cols-1 lg:grid-cols-2 gap-8" : "space-y-8"}>
                    {/* LEFT: Your Information */}
                    {(isGroup || step === 1) && (
                    <div className={isGroup ? "space-y-4" : "space-y-4 max-w-xl mx-auto w-full"}>
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-wide">
                        {t("register.yourInformation")}
                      </h3>

                      {category === "group" ? (
                        <>
                          <div>
                            <label className={labelClass}>{t("register.institution")}</label>
                            <input
                              type="text"
                              required
                              value={groupForm.institution}
                              onChange={(e) => setGroupForm({ ...groupForm, institution: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>{t("register.address")}</label>
                            <input
                              type="text"
                              value={groupForm.address}
                              onChange={(e) => setGroupForm({ ...groupForm, address: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>{t("register.email")}</label>
                            <input
                              type="email"
                              required
                              value={groupForm.email}
                              onChange={(e) => setGroupForm({ ...groupForm, email: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>{t("register.phone")}</label>
                            <input
                              type="tel"
                              required
                              value={groupForm.phone}
                              onChange={(e) => setGroupForm({ ...groupForm, phone: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>{t("register.responsiblePerson")}</label>
                            <input
                              type="text"
                              required
                              value={groupForm.responsiblePerson}
                              onChange={(e) => setGroupForm({ ...groupForm, responsiblePerson: e.target.value })}
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className={labelClass}>{t("register.date")}</label>
                            <div className="space-y-2">
                              {groupDates.map((d, idx) => (
                                <input
                                  key={idx}
                                  type="date"
                                  value={d}
                                  onChange={(e) => updateGroupDate(idx, e.target.value)}
                                  className={inputClass}
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={addGroupDate}
                              className="mt-2 w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-sky-700 text-[11px] font-medium uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Plus className="w-3.5 h-3.5" /> {t("register.addAnotherDate")}
                            </button>
                          </div>

                          <div>
                            <label className={labelClass}>{t("register.time")}</label>
                            <input
                              type="time"
                              value={groupForm.time}
                              onChange={(e) => setGroupForm({ ...groupForm, time: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>{t("register.numberOfPeople")}</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="0"
                              value={groupForm.numberOfPeople}
                              onChange={(e) => setGroupForm({ ...groupForm, numberOfPeople: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>{t("register.age")}</label>
                            <input
                              type="number"
                              min={0}
                              placeholder="0"
                              value={groupForm.age}
                              onChange={(e) => setGroupForm({ ...groupForm, age: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>{t("register.males")}</label>
                              <input
                                type="number"
                                min={0}
                                placeholder="0"
                                value={groupForm.males}
                                onChange={(e) => setGroupForm({ ...groupForm, males: e.target.value })}
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label className={labelClass}>{t("register.females")}</label>
                              <input
                                type="number"
                                min={0}
                                placeholder="0"
                                value={groupForm.females}
                                onChange={(e) => setGroupForm({ ...groupForm, females: e.target.value })}
                                className={inputClass}
                              />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>{t("register.chooseOffer")}</label>
                            <select
                              value={groupForm.offer}
                              onChange={(e) => setGroupForm({ ...groupForm, offer: e.target.value })}
                              className={selectClass}
                            >
                              {groupOfferOptions.map((o) => (
                                <option key={o} value={o}>
                                  {t(o)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          {members.map((member, idx) => (
                            <div
                              key={idx}
                              className={idx > 0 ? "pt-4 mt-4 border-t border-slate-200 space-y-4" : "space-y-4"}
                            >
                              {idx > 0 && (
                                <p className="text-[10px] font-semibold uppercase text-sky-700 tracking-wider">
                                  {t("register.member")} {idx + 1}
                                </p>
                              )}

                              <div>
                                <label className={labelClass}>{t("register.firstName")}</label>
                                <input
                                  type="text"
                                  required={idx === 0}
                                  placeholder={t("register.firstNamePlaceholder")}
                                  value={member.firstName}
                                  onChange={(e) => updateMember(idx, { firstName: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              {category === "swimming-school" && (
                                <div>
                                  <label className={labelClass}>{t("register.parentsName")}</label>
                                  <input
                                    type="text"
                                    placeholder={t("register.parentsNamePlaceholder")}
                                    value={member.parentName}
                                    onChange={(e) => updateMember(idx, { parentName: e.target.value })}
                                    className={inputClass}
                                  />
                                </div>
                              )}

                              <div>
                                <label className={labelClass}>{t("register.lastName")}</label>
                                <input
                                  type="text"
                                  required={idx === 0}
                                  placeholder={t("register.lastNamePlaceholder")}
                                  value={member.lastName}
                                  onChange={(e) => updateMember(idx, { lastName: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              <div>
                                <label className={labelClass}>{t("register.dob")}</label>
                                <input
                                  type="date"
                                  value={member.dob}
                                  onChange={(e) => updateMember(idx, { dob: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              {category === "adults" && (
                                <div>
                                  <label className={labelClass}>{t("register.age")}</label>
                                  <input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    value={member.age}
                                    onChange={(e) => updateMember(idx, { age: e.target.value })}
                                    className={inputClass}
                                  />
                                </div>
                              )}

                              {(category === "kids-fitness" || category === "swimming-school") && (
                                <div>
                                  <label className={labelClass}>{t("register.childAge")}</label>
                                  <input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    value={member.childAge}
                                    onChange={(e) => updateMember(idx, { childAge: e.target.value })}
                                    className={inputClass}
                                  />
                                </div>
                              )}

                              <div>
                                <label className={labelClass}>{t("register.address")}</label>
                                <input
                                  type="text"
                                  placeholder={t("register.addressPlaceholder")}
                                  value={member.address}
                                  onChange={(e) => updateMember(idx, { address: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              <div>
                                <label className={labelClass}>{t("register.phone")}</label>
                                <input
                                  type="tel"
                                  required={idx === 0}
                                  placeholder={t("register.phonePlaceholder")}
                                  value={member.phone}
                                  onChange={(e) => updateMember(idx, { phone: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              <div>
                                <label className={labelClass}>{t("register.email")}</label>
                                <input
                                  type="email"
                                  required={idx === 0}
                                  placeholder={t("register.emailPlaceholder")}
                                  value={member.email}
                                  onChange={(e) => updateMember(idx, { email: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              {(category === "individual" || category === "swimming-school") && (
                                <div className="pt-2 border-t border-slate-200">
                                  <label className={labelClass}>{t("register.swimmingSkills")}</label>
                                  <div className="space-y-2">
                                    {swimmingSkillOptions.map((skill) => (
                                      <label
                                        key={skill}
                                        className="flex items-center gap-2.5 text-xs font-normal text-slate-700 cursor-pointer"
                                      >
                                        <input
                                          type="radio"
                                          name={`swim-skill-${idx}`}
                                          checked={member.swimmingSkill === skill}
                                          onChange={() => updateMember(idx, { swimmingSkill: skill })}
                                          className="w-4 h-4 border-slate-300 text-sky-500 focus:ring-sky-500 bg-white"
                                        />
                                        {t(skill)}
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="pt-2 border-t border-slate-200">
                                <label className={labelClass}>{t("register.healthProblems")}</label>
                                <div className="flex gap-3">
                                  <button
                                    type="button"
                                    onClick={() => updateMember(idx, { healthProblem: "yes" })}
                                    className={toggleBtnClass(member.healthProblem === "yes")}
                                  >
                                    {t("register.yes")}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateMember(idx, { healthProblem: "no" })}
                                    className={toggleBtnClass(member.healthProblem === "no")}
                                  >
                                    {t("register.no")}
                                  </button>
                                </div>
                                {member.healthProblem === "yes" && (
                                  <div className="mt-2">
                                    <p className="text-[10px] italic text-slate-500 mb-1">
                                      {t("register.describeHealthProblems")}
                                    </p>
                                    <input
                                      type="text"
                                      placeholder={t("register.describeHealthProblemsPlaceholder")}
                                      value={member.healthDescription}
                                      onChange={(e) => updateMember(idx, { healthDescription: e.target.value })}
                                      className={inputClass}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                          {(category === "individual" || category === "swimming-school") && (
                            <button
                              type="button"
                              onClick={addMember}
                              className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-sky-700 text-[11px] font-medium uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5"
                            >
                              {t("register.addMember")} <Plus className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    )}

                    {/* RIGHT: Plan / Pricing */}
                    {(isGroup || step === 2) && (
                    <div className={isGroup ? "space-y-4" : "space-y-4 max-w-xl mx-auto w-full"}>
                      {category === "group" && (
                        <div className="rounded-3xl p-8 bg-gradient-to-br from-sky-500 to-blue-600 text-white text-center shadow-xl">
                          <p className="text-sm font-medium uppercase tracking-widest opacity-90 mb-2">
                            {t("register.totalAmount")}
                          </p>
                          <p className="text-4xl font-black">{formatPrice(groupTotal)}</p>
                        </div>
                      )}

                      {category === "adults" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-slate-900 tracking-wide">
                            {t("register.stepAdults")}
                          </h3>
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>{t("register.plan")}</label>
                              <select
                                value={adultsPlan.frequency}
                                onChange={(e) =>
                                  setAdultsPlan({ ...adultsPlan, frequency: e.target.value, days: [] })
                                }
                                className={selectClass}
                              >
                                {adultsFrequencyOptions.map((f) => (
                                  <option key={f} value={f}>
                                    {t(f)}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>{t("register.duration")}</label>
                              <select
                                value={adultsPlan.duration}
                                onChange={(e) => setAdultsPlan({ ...adultsPlan, duration: e.target.value })}
                                className={selectClass}
                              >
                                {durationOptions.map((d) => (
                                  <option key={d} value={d}>
                                    {t(d)}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-sky-700 uppercase tracking-wide mb-2">
                                {t(adultsMaxDays === 1 ? "register.chooseDays" : "register.chooseDaysPlural", { n: adultsMaxDays })}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                {daysOfWeek.map((day) => (
                                  <button
                                    type="button"
                                    key={day}
                                    onClick={() =>
                                      setAdultsPlan({
                                        ...adultsPlan,
                                        days: toggleDay(adultsPlan.days, day, adultsMaxDays),
                                      })
                                    }
                                    className={toggleBtnClass(adultsPlan.days.includes(day))}
                                  >
                                    {t(day)}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                              <span className="text-[10px] font-medium uppercase text-slate-600 tracking-wider">
                                {t("register.price")}
                              </span>
                              <span className="text-2xl font-black text-slate-900">{formatPrice(adultsPrice)}</span>
                            </div>
                            <button
                              type="button"
                              className="w-full h-11 rounded-full border border-sky-500/30 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
                            >
                              {t("register.choosePlan")}
                            </button>
                          </div>
                        </>
                      )}

                      {category === "kids-fitness" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-slate-900 tracking-wide">
                            {t("register.kidsFitness")}
                          </h3>
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>{t("register.plan")}</label>
                              <select
                                value={kidsPlan.frequency}
                                onChange={(e) => setKidsPlan({ ...kidsPlan, frequency: e.target.value, days: [] })}
                                className={selectClass}
                              >
                                {kidsFrequencyOptions.map((f) => (
                                  <option key={f} value={f}>
                                    {t(f)}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>{t("register.time_")}</label>
                              <select
                                value={kidsPlan.time}
                                onChange={(e) => setKidsPlan({ ...kidsPlan, time: e.target.value })}
                                className={selectClass}
                              >
                                {kidsTimeOptions.map((timeOpt) => (
                                  <option key={timeOpt} value={timeOpt}>
                                    {t("register.time_")}: {timeOpt}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-sky-700 uppercase tracking-wide mb-2">
                                {t("register.schedule")}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                {daysOfWeek.map((day) => (
                                  <button
                                    type="button"
                                    key={day}
                                    onClick={() =>
                                      setKidsPlan({ ...kidsPlan, days: toggleDay(kidsPlan.days, day, kidsMaxDays) })
                                    }
                                    className={toggleBtnClass(kidsPlan.days.includes(day))}
                                  >
                                    {t(day)}
                                  </button>
                                ))}
                              </div>
                              <p className="text-[10px] italic text-slate-500 mt-2">
                                {t(kidsMaxDays === 1 ? "register.chooseDaysOfWeek" : "register.chooseDaysOfWeekPlural", { n: kidsMaxDays })}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                              <span className="text-[10px] font-medium uppercase text-slate-600 tracking-wider">
                                {t("register.price")}
                              </span>
                              <span className="text-2xl font-black text-slate-900">{formatPrice(kidsPrice)}</span>
                            </div>
                            <button
                              type="button"
                              className="w-full h-11 rounded-full border border-sky-500/30 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
                            >
                              {t("register.choosePlan")}
                            </button>
                          </div>
                        </>
                      )}

                      {category === "swimming-school" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-slate-900 tracking-wide">
                            {t("register.swimmingSchool")}
                          </h3>
                          {swimCards.map((card, idx) => {
                            const price = swimEntriesPriceMap[card.entries] * (1 - card.discount);
                            return (
                              <div key={idx} className={planCardClass}>
                                <p className="text-[10px] font-bold text-sky-700 uppercase tracking-wide">
                                  {t(card.label)}
                                </p>
                                <div>
                                  <label className={labelClass}>{t("register.duration")}</label>
                                  <select
                                    value={card.duration}
                                    onChange={(e) => updateSwimCard(idx, { duration: e.target.value })}
                                    className={selectClass}
                                  >
                                    {durationOptions.map((d) => (
                                      <option key={d} value={d}>
                                        {t(d)}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className={labelClass}>{t("register.entries")}</label>
                                  <select
                                    value={card.entries}
                                    onChange={(e) => updateSwimCard(idx, { entries: e.target.value })}
                                    className={selectClass}
                                  >
                                    {swimEntryOptions.map((o) => (
                                      <option key={o} value={o}>
                                        {t(o)}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {card.level !== undefined && (
                                  <div>
                                    <label className={labelClass}>{t("register.level")}</label>
                                    <select
                                      value={card.level}
                                      onChange={(e) => updateSwimCard(idx, { level: e.target.value })}
                                      className={selectClass}
                                    >
                                      {swimLevelOptions.map((l) => (
                                        <option key={l} value={l}>
                                          {t(l)}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                                <p className="text-[11px] text-slate-600 font-normal">
                                  {t("register.entriesLabel")} <span className="font-semibold text-slate-800">{t(card.entries)}</span>
                                </p>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                                  <span className="text-[10px] font-medium uppercase text-slate-600 tracking-wider">
                                    {t("register.price")}
                                  </span>
                                  <span className="text-2xl font-black text-slate-900">{formatPrice(price)}</span>
                                </div>
                                <button
                                  type="button"
                                  className="w-full h-11 rounded-full border border-sky-500/30 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
                                >
                                  {t("register.choosePlan")}
                                </button>
                              </div>
                            );
                          })}
                        </>
                      )}

                      {category === "individual" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-slate-900 tracking-wide">
                            {t("register.individualHeading")}
                          </h3>

                          {/* Card 1: build your own plan */}
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>{t("register.duration")}</label>
                              <select
                                value={individualCards[0].duration}
                                onChange={(e) => updateIndividualCard(0, { duration: e.target.value })}
                                className={selectClass}
                              >
                                {durationOptions.map((d) => (
                                  <option key={d} value={d}>
                                    {t(d)}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>{t("register.option")}</label>
                              <select
                                value={individualCards[0].entries}
                                onChange={(e) => updateIndividualCard(0, { entries: e.target.value })}
                                className={selectClass}
                              >
                                <option value="">{t("register.chooseAnOption")}</option>
                                {individualEntryOptions.map((o) => (
                                  <option key={o} value={o}>
                                    {t(o)}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {individualCards[0].entries ? (
                              <>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                                  <span className="text-[10px] font-medium uppercase text-slate-600 tracking-wider">
                                    {t("register.price")}
                                  </span>
                                  <span className="text-2xl font-black text-slate-900">
                                    {formatPrice(individualEntriesPriceMap[individualCards[0].entries])}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="w-full h-11 rounded-full border border-sky-500/30 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
                                >
                                  {t("register.choosePlan")}
                                </button>
                              </>
                            ) : (
                              <p className="text-[11px] italic text-slate-500 font-normal">
                                {t("register.choosePlanToSeePrice")}
                              </p>
                            )}
                          </div>

                          {/* Card 2: fixed unlimited plan */}
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>{t("register.duration")}</label>
                              <select
                                value={individualCards[1].duration}
                                onChange={(e) => updateIndividualCard(1, { duration: e.target.value })}
                                className={selectClass}
                              >
                                {durationOptions.map((d) => (
                                  <option key={d} value={d}>
                                    {t(d)}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <p className="text-[11px] text-slate-600 font-normal">
                              {t("register.entriesLabel")} <span className="font-semibold text-slate-800">{t("register.entriesUnlimited")}</span>
                            </p>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                              <span className="text-[10px] font-medium uppercase text-slate-600 tracking-wider">
                                {t("register.price")}
                              </span>
                              <span className="text-2xl font-black text-slate-900">
                                {formatPrice(individualEntriesPriceMap["Unlimited Entries"])}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="w-full h-11 rounded-full border border-sky-500/30 bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
                            >
                              {t("register.choosePlan")}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    )}
                  </div>

                  {/* Step 1 -> Step 2 */}
                  {!isGroup && step === 1 && (
                    <div className="flex justify-end pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="font-ui h-12 px-8 rounded-full text-xs font-black tracking-wider uppercase bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30 transition-all duration-300 active:scale-95"
                      >
                        {t("register.next")}
                      </button>
                    </div>
                  )}

                  {/* Agree Checkbox + Submit */}
                  {(isGroup || step === 2) && (
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-4">
                      {!isGroup && (
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="h-11 px-5 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          {t("register.back")}
                        </button>
                      )}
                      <div className="flex items-center gap-3">
                        <input
                          id="agree-checkbox"
                          type="checkbox"
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 bg-white text-sky-500 focus:ring-sky-500"
                        />
                        <label htmlFor="agree-checkbox" className="text-[11px] text-slate-600 font-normal select-none">
                          {t("register.agreeToThe")}{" "}
                          <a href="#about-us" className="text-sky-600 hover:underline font-medium">
                            {t("register.termsAndConditions")}
                          </a>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-ui h-12 px-8 rounded-full text-xs font-black tracking-wider uppercase bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : category === "group" ? (
                        t("register.sendRequest")
                      ) : (
                        t("register.heading")
                      )}
                    </button>
                  </div>
                  )}
                </motion.form>
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                className="flex flex-col items-center justify-center py-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center mb-6 text-sky-600">
                  <CheckCircle className="w-10 h-10 animate-bounce" />
                </div>

                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-3">
                  {t("register.success")}
                </h2>

                <p className="font-ui text-sm text-slate-600 max-w-sm mb-10 leading-relaxed font-normal">
                  {successMessage}
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setSuccessMessage("");
                    }}
                    className="font-ui w-full h-12 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-medium tracking-widest uppercase transition-all duration-300 active:scale-95"
                  >
                    {t("register.goBackToForm")}
                  </button>
                  <a
                    href="#home"
                    className="font-ui w-full h-12 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-black tracking-wider uppercase shadow-md shadow-sky-500/20 transition-all duration-300 flex items-center justify-center active:scale-95"
                  >
                    {t("register.returnToHomepage")}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
