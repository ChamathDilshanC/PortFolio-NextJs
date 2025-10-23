"use client";

import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Briefcase,
  Check,
  Handshake,
  Laptop,
  Loader2,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomMessage, setShowCustomMessage] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<
    number | null
  >(null);

  const predefinedMessages = [
    {
      label: "Project Collaboration",
      icon: Briefcase,
      color: "text-blue-500",
      hoverColor: "hover:text-blue-600",
      bgColor: "bg-blue-500/10",
      message:
        "Hi! I'd like to discuss a potential project collaboration with you. Let's connect!",
    },
    {
      label: "Hire for a Project",
      icon: Laptop,
      color: "text-purple-500",
      hoverColor: "hover:text-purple-600",
      bgColor: "bg-purple-500/10",
      message:
        "Hello! I'm interested in hiring you for a project. Can we discuss the details?",
    },
    {
      label: "Partnership Opportunity",
      icon: Handshake,
      color: "text-green-500",
      hoverColor: "hover:text-green-600",
      bgColor: "bg-green-500/10",
      message:
        "Hi! I have a partnership opportunity that might interest you. Let's talk!",
    },
    {
      label: "Mentorship Request",
      icon: BookOpen,
      color: "text-orange-500",
      hoverColor: "hover:text-orange-600",
      bgColor: "bg-orange-500/10",
      message:
        "Hello! I'm looking for mentorship in software development. Would you be available?",
    },
    {
      label: "Job Opportunity",
      icon: Target,
      color: "text-pink-500",
      hoverColor: "hover:text-pink-600",
      bgColor: "bg-pink-500/10",
      message:
        "Hi! We have an exciting job opportunity at our company. Are you open to new opportunities?",
    },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate all fields
    if (!formData.name.trim()) {
      showToast("Please enter your full name", "warning");
      return;
    }

    if (!formData.email.trim()) {
      showToast("Please enter your email address", "warning");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address", "warning");
      return;
    }

    if (!formData.message.trim()) {
      showToast("Please select or write a description message", "warning");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "81d5b7f5-8ffb-40df-ba1e-6b0e3af8a3a1",
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        showToast("Message sent successfully! 🎉", "success");
        setFormData({ name: "", email: "", message: "" });
        setSelectedMessageIndex(null);
        setShowCustomMessage(false);
      } else {
        showToast("Failed to send message. Please try again.", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredefinedMessage = (message: string, index: number) => {
    setFormData({
      ...formData,
      message: message,
    });
    setSelectedMessageIndex(index);
    setShowCustomMessage(false);
  };

  const handleCustomMessage = () => {
    setShowCustomMessage(true);
    setSelectedMessageIndex(null);
    setFormData({
      ...formData,
      message: "",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground text-left block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Full Name"
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground text-left block">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground text-left block mb-3">
              Description <span className="text-red-500">*</span>
            </label>

            {!showCustomMessage ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {predefinedMessages.map((item, index) => {
                    const IconComponent = item.icon;
                    const isSelected = selectedMessageIndex === index;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          handlePredefinedMessage(item.message, index)
                        }
                        className={cn(
                          "text-sm transition-all flex items-center gap-2 px-2 py-1.5 text-left relative group",
                          isSelected
                            ? `${item.color} font-semibold`
                            : `text-muted-foreground ${item.hoverColor}`
                        )}
                      >
                        <IconComponent
                          className={cn(
                            "h-4 w-4 flex-shrink-0",
                            isSelected
                              ? ""
                              : "opacity-60 group-hover:opacity-100"
                          )}
                        />
                        <span className="flex-1">{item.label}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-blue-500 flex-shrink-0 animate-in zoom-in duration-200" />
                        )}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleCustomMessage}
                    className={cn(
                      "text-sm transition-all flex items-center gap-2 px-2 py-1.5 text-left relative group",
                      showCustomMessage
                        ? "text-amber-500 font-semibold"
                        : "text-muted-foreground hover:text-amber-600"
                    )}
                  >
                    <Sparkles
                      className={cn(
                        "h-4 w-4 flex-shrink-0",
                        showCustomMessage
                          ? ""
                          : "opacity-60 group-hover:opacity-100"
                      )}
                    />
                    <span className="flex-1">Custom</span>
                    {showCustomMessage && (
                      <Check className="h-4 w-4 text-blue-500 flex-shrink-0 animate-in zoom-in duration-200" />
                    )}
                  </button>
                </div>

                {selectedMessageIndex !== null && (
                  <div className="mt-4 text-left pl-1">
                    <div className="text-sm leading-relaxed">
                      <TextAnimate animation="blurInUp" by="character" once>
                        {predefinedMessages[selectedMessageIndex].message}
                      </TextAnimate>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Type your custom message here..."
                  className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCustomMessage(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ← Back to templates
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.name.trim() ||
                !formData.email.trim() ||
                !formData.message.trim()
              }
              className={cn(
                "group relative w-full md:w-1/2 flex items-center justify-between rounded-full border border-[#3B3BF6] bg-[#1E1E1E] px-4 py-3 text-sm text-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B3BF6]/50",
                (isSubmitting ||
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  !formData.message.trim()) &&
                  "opacity-60 cursor-not-allowed",
                !(
                  isSubmitting ||
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  !formData.message.trim()
                ) && "hover:shadow-[0_0_10px_#3B3BF6]"
              )}
            >
              {/* Left text or loader */}
              {isSubmitting ? (
                <div className="flex items-center gap-2 mx-auto">
                  <Loader2 className="h-4 w-4 animate-spin text-[#3B3BF6]" />
                  <span>Sending...</span>
                </div>
              ) : (
                <span
                  className={cn(
                    "pl-2 transition-colors duration-300",
                    formData.name.trim() &&
                      formData.email.trim() &&
                      formData.message.trim()
                      ? "text-gray-200"
                      : "text-gray-500"
                  )}
                >
                  Send Message
                </span>
              )}

              {/* Telegram Icon Bubble */}
              <div
                className={cn(
                  "absolute right-2 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                  formData.name.trim() &&
                    formData.email.trim() &&
                    formData.message.trim()
                    ? "bg-[#3B3BF6] group-hover:bg-[#5050ff] group-hover:translate-x-1"
                    : "bg-gray-600"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="h-4 w-4"
                >
                  <path d="M9.036 15.58l-.396 5.594c.566 0 .81-.244 1.102-.537l2.64-2.529 5.475 4.012c1.004.553 1.716.262 1.978-.929l3.584-16.8.002-.002c.32-1.495-.54-2.086-1.514-1.721L1.16 9.51c-1.447.553-1.426 1.345-.261 1.706l5.96 1.862 13.833-8.721L9.036 15.58z" />
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
