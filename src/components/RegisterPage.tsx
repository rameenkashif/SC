import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle, Plus } from "lucide-react";

type Category = "individual" | "adults" | "kids-fitness" | "swimming-school" | "group";

const categoryOrder: Category[] = ["individual", "adults", "kids-fitness", "swimming-school", "group"];

const categoryLabels: Record<Category, string> = {
  individual: "Individual",
  adults: "Adults",
  "kids-fitness": "Kids Fitness",
  "swimming-school": "Swimming School",
  group: "Group Reservations",
};

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
  "w-full h-11 px-4 rounded-xl border border-sky-100 bg-white/60 text-slate-800 placeholder-slate-400 font-normal text-xs focus:border-sky-500 focus:bg-white focus:outline-none transition-all duration-300";
const selectClass =
  "w-full h-11 px-3 rounded-xl border border-sky-100 bg-white text-slate-800 font-normal text-xs focus:border-sky-500 focus:outline-none transition-all duration-300 cursor-pointer";
const labelClass = "text-[10px] font-medium uppercase text-slate-500 tracking-wider mb-1.5 block";
const toggleBtnClass = (active: boolean) =>
  `px-3 py-2 rounded-lg border text-[10px] font-medium uppercase tracking-wide transition-colors ${
    active ? "bg-sky-500 border-sky-500 text-white" : "border-sky-200 text-slate-600 hover:border-sky-400"
  }`;
const planCardClass = "rounded-2xl border border-sky-200 bg-white p-5 shadow-md space-y-4";

export const RegisterPage: React.FC = () => {
  const [category, setCategory] = useState<Category>("individual");
  const [agree, setAgree] = useState(false);

  const [members, setMembers] = useState<MemberInfo[]>([emptyMember()]);
  useEffect(() => {
    setMembers([emptyMember()]);
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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("You must agree to the Terms of Service.");
      return;
    }
    if (category === "group") {
      if (!groupForm.institution || !groupForm.email || !groupForm.phone || !groupForm.responsiblePerson) {
        alert("Please fill in all required fields.");
        return;
      }
    } else {
      const first = members[0];
      if (!first.firstName || !first.lastName || !first.phone || !first.email) {
        alert("Please fill in all required fields.");
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        category === "group"
          ? `Your group reservation request has been sent! We'll get back to you at ${groupForm.email}.`
          : `Registration request submitted for ${categoryLabels[category]}. Welcome to Steps Sport Center!`
      );
      setIsSuccess(true);
      setAgree(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-white text-slate-800 pt-24 pb-16 px-6 flex flex-col justify-center">
      <div className="max-w-5xl w-full mx-auto my-auto">
        {/* Back navigation */}
        <div className="mb-6 flex justify-between items-center">
          <a
            href="#home"
            className="font-ui inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Steps Sport Center
          </span>
        </div>

        {/* Register Page Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 md:p-10 rounded-[32px] border border-white/75 bg-white/45 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Decorative glowing background accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/15 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-450/15 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="register-form-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Page Heading, matching home page heading size & weight */}
                <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-blue-950 text-center mb-8">
                  Register
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
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                      Choose a Category
                    </p>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className={selectClass + " w-auto min-w-[200px]"}
                    >
                      {categoryOrder.map((c) => (
                        <option key={c} value={c}>
                          {categoryLabels[c]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT: Your Information */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-black uppercase text-blue-950 tracking-wide">
                        Your Information
                      </h3>

                      {category === "group" ? (
                        <>
                          <div>
                            <label className={labelClass}>Institution</label>
                            <input
                              type="text"
                              required
                              value={groupForm.institution}
                              onChange={(e) => setGroupForm({ ...groupForm, institution: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Address</label>
                            <input
                              type="text"
                              value={groupForm.address}
                              onChange={(e) => setGroupForm({ ...groupForm, address: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Email</label>
                            <input
                              type="email"
                              required
                              value={groupForm.email}
                              onChange={(e) => setGroupForm({ ...groupForm, email: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Phone</label>
                            <input
                              type="tel"
                              required
                              value={groupForm.phone}
                              onChange={(e) => setGroupForm({ ...groupForm, phone: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Responsible Person</label>
                            <input
                              type="text"
                              required
                              value={groupForm.responsiblePerson}
                              onChange={(e) => setGroupForm({ ...groupForm, responsiblePerson: e.target.value })}
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className={labelClass}>Date</label>
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
                              className="mt-2 w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Another Date
                            </button>
                          </div>

                          <div>
                            <label className={labelClass}>Time</label>
                            <input
                              type="time"
                              value={groupForm.time}
                              onChange={(e) => setGroupForm({ ...groupForm, time: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Number of People</label>
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
                            <label className={labelClass}>Age</label>
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
                              <label className={labelClass}>Males</label>
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
                              <label className={labelClass}>Females</label>
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
                            <label className={labelClass}>Choose Offer</label>
                            <select
                              value={groupForm.offer}
                              onChange={(e) => setGroupForm({ ...groupForm, offer: e.target.value })}
                              className={selectClass}
                            >
                              {groupOfferOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
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
                              className={idx > 0 ? "pt-4 mt-4 border-t border-sky-100 space-y-4" : "space-y-4"}
                            >
                              {idx > 0 && (
                                <p className="text-[10px] font-semibold uppercase text-sky-600 tracking-wider">
                                  Member {idx + 1}
                                </p>
                              )}

                              <div>
                                <label className={labelClass}>First Name</label>
                                <input
                                  type="text"
                                  required={idx === 0}
                                  placeholder="Enter your first name"
                                  value={member.firstName}
                                  onChange={(e) => updateMember(idx, { firstName: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              {category === "swimming-school" && (
                                <div>
                                  <label className={labelClass}>Parent's Name</label>
                                  <input
                                    type="text"
                                    placeholder="Enter parent's name"
                                    value={member.parentName}
                                    onChange={(e) => updateMember(idx, { parentName: e.target.value })}
                                    className={inputClass}
                                  />
                                </div>
                              )}

                              <div>
                                <label className={labelClass}>Last Name</label>
                                <input
                                  type="text"
                                  required={idx === 0}
                                  placeholder="Enter your last name"
                                  value={member.lastName}
                                  onChange={(e) => updateMember(idx, { lastName: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              <div>
                                <label className={labelClass}>Date of Birth</label>
                                <input
                                  type="date"
                                  value={member.dob}
                                  onChange={(e) => updateMember(idx, { dob: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              {category === "adults" && (
                                <div>
                                  <label className={labelClass}>Age</label>
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
                                  <label className={labelClass}>Child Age</label>
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
                                <label className={labelClass}>Address</label>
                                <input
                                  type="text"
                                  placeholder="Enter your address"
                                  value={member.address}
                                  onChange={(e) => updateMember(idx, { address: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              <div>
                                <label className={labelClass}>Phone</label>
                                <input
                                  type="tel"
                                  required={idx === 0}
                                  placeholder="+383 XX XXX XXX"
                                  value={member.phone}
                                  onChange={(e) => updateMember(idx, { phone: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              <div>
                                <label className={labelClass}>Email</label>
                                <input
                                  type="email"
                                  required={idx === 0}
                                  placeholder="example@email.com"
                                  value={member.email}
                                  onChange={(e) => updateMember(idx, { email: e.target.value })}
                                  className={inputClass}
                                />
                              </div>

                              {(category === "individual" || category === "swimming-school") && (
                                <div className="pt-2 border-t border-sky-100">
                                  <label className={labelClass}>Swimming Skills</label>
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
                                          className="w-4 h-4 border-sky-200 text-sky-500 focus:ring-sky-500"
                                        />
                                        {skill}
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="pt-2 border-t border-sky-100">
                                <label className={labelClass}>Health Problems</label>
                                <div className="flex gap-3">
                                  <button
                                    type="button"
                                    onClick={() => updateMember(idx, { healthProblem: "yes" })}
                                    className={toggleBtnClass(member.healthProblem === "yes")}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateMember(idx, { healthProblem: "no" })}
                                    className={toggleBtnClass(member.healthProblem === "no")}
                                  >
                                    No
                                  </button>
                                </div>
                                {member.healthProblem === "yes" && (
                                  <div className="mt-2">
                                    <p className="text-[10px] italic text-slate-500 mb-1">
                                      Please describe health problems
                                    </p>
                                    <input
                                      type="text"
                                      placeholder="Describe health problems"
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
                              className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5"
                            >
                              Add Member <Plus className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* RIGHT: Plan / Pricing */}
                    <div className="space-y-4">
                      {category === "group" && (
                        <div className="rounded-3xl p-8 bg-gradient-to-br from-sky-400 to-blue-600 text-white text-center shadow-xl">
                          <p className="text-sm font-medium uppercase tracking-widest opacity-90 mb-2">
                            Total Amount
                          </p>
                          <p className="text-4xl font-black">{formatPrice(groupTotal)}</p>
                        </div>
                      )}

                      {category === "adults" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-blue-950 tracking-wide">
                            Step Adults
                          </h3>
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>Plan</label>
                              <select
                                value={adultsPlan.frequency}
                                onChange={(e) =>
                                  setAdultsPlan({ ...adultsPlan, frequency: e.target.value, days: [] })
                                }
                                className={selectClass}
                              >
                                {adultsFrequencyOptions.map((f) => (
                                  <option key={f} value={f}>
                                    {f}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>Duration</label>
                              <select
                                value={adultsPlan.duration}
                                onChange={(e) => setAdultsPlan({ ...adultsPlan, duration: e.target.value })}
                                className={selectClass}
                              >
                                {durationOptions.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-sky-600 uppercase tracking-wide mb-2">
                                Choose {adultsMaxDays} Day{adultsMaxDays === 1 ? "" : "s"}
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
                                    {day}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                              <span className="text-[10px] font-medium uppercase text-slate-500 tracking-wider">
                                Price
                              </span>
                              <span className="text-2xl font-black text-blue-950">{formatPrice(adultsPrice)}</span>
                            </div>
                            <button
                              type="button"
                              className="w-full h-11 rounded-full border-2 border-sky-500 text-sky-600 text-xs font-black uppercase tracking-wider hover:bg-sky-500 hover:text-white transition-colors"
                            >
                              Choose Plan
                            </button>
                          </div>
                        </>
                      )}

                      {category === "kids-fitness" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-blue-950 tracking-wide">
                            Kids Fitness
                          </h3>
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>Plan</label>
                              <select
                                value={kidsPlan.frequency}
                                onChange={(e) => setKidsPlan({ ...kidsPlan, frequency: e.target.value, days: [] })}
                                className={selectClass}
                              >
                                {kidsFrequencyOptions.map((f) => (
                                  <option key={f} value={f}>
                                    {f}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>Time</label>
                              <select
                                value={kidsPlan.time}
                                onChange={(e) => setKidsPlan({ ...kidsPlan, time: e.target.value })}
                                className={selectClass}
                              >
                                {kidsTimeOptions.map((t) => (
                                  <option key={t} value={t}>
                                    Time: {t}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-sky-600 uppercase tracking-wide mb-2">
                                Schedule
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
                                    {day}
                                  </button>
                                ))}
                              </div>
                              <p className="text-[10px] italic text-slate-500 mt-2">
                                Choose {kidsMaxDays} day{kidsMaxDays === 1 ? "" : "s"} of the week
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                              <span className="text-[10px] font-medium uppercase text-slate-500 tracking-wider">
                                Price
                              </span>
                              <span className="text-2xl font-black text-blue-950">{formatPrice(kidsPrice)}</span>
                            </div>
                            <button
                              type="button"
                              className="w-full h-11 rounded-full border-2 border-sky-500 text-sky-600 text-xs font-black uppercase tracking-wider hover:bg-sky-500 hover:text-white transition-colors"
                            >
                              Choose Plan
                            </button>
                          </div>
                        </>
                      )}

                      {category === "swimming-school" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-blue-950 tracking-wide">
                            Swimming School
                          </h3>
                          {swimCards.map((card, idx) => {
                            const price = swimEntriesPriceMap[card.entries] * (1 - card.discount);
                            return (
                              <div key={idx} className={planCardClass}>
                                <p className="text-[10px] font-semibold text-sky-600 uppercase tracking-wide">
                                  {card.label}
                                </p>
                                <div>
                                  <label className={labelClass}>Duration</label>
                                  <select
                                    value={card.duration}
                                    onChange={(e) => updateSwimCard(idx, { duration: e.target.value })}
                                    className={selectClass}
                                  >
                                    {durationOptions.map((d) => (
                                      <option key={d} value={d}>
                                        {d}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className={labelClass}>Entries</label>
                                  <select
                                    value={card.entries}
                                    onChange={(e) => updateSwimCard(idx, { entries: e.target.value })}
                                    className={selectClass}
                                  >
                                    {swimEntryOptions.map((o) => (
                                      <option key={o} value={o}>
                                        {o}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                {card.level !== undefined && (
                                  <div>
                                    <label className={labelClass}>Level</label>
                                    <select
                                      value={card.level}
                                      onChange={(e) => updateSwimCard(idx, { level: e.target.value })}
                                      className={selectClass}
                                    >
                                      {swimLevelOptions.map((l) => (
                                        <option key={l} value={l}>
                                          {l}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                                <p className="text-[11px] text-slate-500 font-normal">
                                  Entries: <span className="font-medium text-slate-700">{card.entries}</span>
                                </p>
                                <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                                  <span className="text-[10px] font-medium uppercase text-slate-500 tracking-wider">
                                    Price
                                  </span>
                                  <span className="text-2xl font-black text-blue-950">{formatPrice(price)}</span>
                                </div>
                                <button
                                  type="button"
                                  className="w-full h-11 rounded-full border-2 border-sky-500 text-sky-600 text-xs font-black uppercase tracking-wider hover:bg-sky-500 hover:text-white transition-colors"
                                >
                                  Choose Plan
                                </button>
                              </div>
                            );
                          })}
                        </>
                      )}

                      {category === "individual" && (
                        <>
                          <h3 className="text-sm font-black uppercase text-blue-950 tracking-wide">
                            Individual
                          </h3>

                          {/* Card 1: build your own plan */}
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>Duration</label>
                              <select
                                value={individualCards[0].duration}
                                onChange={(e) => updateIndividualCard(0, { duration: e.target.value })}
                                className={selectClass}
                              >
                                {durationOptions.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelClass}>Option</label>
                              <select
                                value={individualCards[0].entries}
                                onChange={(e) => updateIndividualCard(0, { entries: e.target.value })}
                                className={selectClass}
                              >
                                <option value="">Choose an option</option>
                                {individualEntryOptions.map((o) => (
                                  <option key={o} value={o}>
                                    {o}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {individualCards[0].entries ? (
                              <>
                                <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                                  <span className="text-[10px] font-medium uppercase text-slate-500 tracking-wider">
                                    Price
                                  </span>
                                  <span className="text-2xl font-black text-blue-950">
                                    {formatPrice(individualEntriesPriceMap[individualCards[0].entries])}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="w-full h-11 rounded-full border-2 border-sky-500 text-sky-600 text-xs font-black uppercase tracking-wider hover:bg-sky-500 hover:text-white transition-colors"
                                >
                                  Choose Plan
                                </button>
                              </>
                            ) : (
                              <p className="text-[11px] italic text-slate-500 font-normal">
                                Choose a plan to see the price
                              </p>
                            )}
                          </div>

                          {/* Card 2: fixed unlimited plan */}
                          <div className={planCardClass}>
                            <div>
                              <label className={labelClass}>Duration</label>
                              <select
                                value={individualCards[1].duration}
                                onChange={(e) => updateIndividualCard(1, { duration: e.target.value })}
                                className={selectClass}
                              >
                                {durationOptions.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <p className="text-[11px] text-slate-500 font-normal">
                              Entries: <span className="font-medium text-slate-700">unlimited</span>
                            </p>
                            <div className="flex items-center justify-between pt-2 border-t border-sky-100">
                              <span className="text-[10px] font-medium uppercase text-slate-500 tracking-wider">
                                Price
                              </span>
                              <span className="text-2xl font-black text-blue-950">
                                {formatPrice(individualEntriesPriceMap["Unlimited Entries"])}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="w-full h-11 rounded-full border-2 border-sky-500 text-sky-600 text-xs font-black uppercase tracking-wider hover:bg-sky-500 hover:text-white transition-colors"
                            >
                              Choose Plan
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Agree Checkbox + Submit */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sky-100">
                    <div className="flex items-center gap-3">
                      <input
                        id="agree-checkbox"
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="w-4 h-4 rounded border-sky-200 bg-white text-sky-500 focus:ring-sky-500"
                      />
                      <label htmlFor="agree-checkbox" className="text-[11px] text-slate-600 font-normal select-none">
                        I agree to the{" "}
                        <a href="#about-us" className="text-sky-600 hover:underline">
                          terms and conditions
                        </a>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-ui h-12 px-8 rounded-full text-xs font-black tracking-wider uppercase bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : category === "group" ? (
                        "Send Request"
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
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

                <h2 className="text-2xl font-black uppercase tracking-tight text-blue-950 mb-3">
                  Success!
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
                    className="font-ui w-full h-12 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-medium tracking-widest uppercase transition-all duration-300 active:scale-95"
                  >
                    Go Back to Form
                  </button>
                  <a
                    href="#home"
                    className="font-ui w-full h-12 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-xs font-black tracking-wider uppercase shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 flex items-center justify-center active:scale-95"
                  >
                    Return to Homepage
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
