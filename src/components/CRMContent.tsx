"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Users, FolderKanban, Trash2, CheckCircle2, ChevronRight, X, UserCheck, MessageSquare, Globe, Activity, Search, Filter, Clock, User, FileText, RefreshCw } from "lucide-react";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string | null;
  message: string | null;
  source: string | null;
  status: string | null;
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
  contact: string | null;
  createdAt: string;
}

interface ActivityUser {
  name: string | null;
  email?: string | null;
}

interface ActivityItem {
  id: string;
  type: string;
  description: string | null;
  userId: string;
  createdAt: string;
  user: ActivityUser;
}

interface CRMContentProps {
  initialLeads: Lead[];
  initialClients: Client[];
  initialActivities: ActivityItem[];
}

export function CRMContent({ initialLeads, initialClients, initialActivities }: CRMContentProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [activeTab, setActiveTab] = useState<"leads" | "clients" | "activities">("leads");

  // Modals state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  
  // Selected lead message detail modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Forms state
  const [leadForm, setLeadForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    source: "Manual",
    status: "New",
  });

  const [clientForm, setClientForm] = useState({
    name: "",
    contact: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activitySearch, setActivitySearch] = useState("");
  const [activityTypeFilter, setActivityTypeFilter] = useState("all");

  // Handler: Refresh Activities
  const refreshActivities = async () => {
    try {
      const res = await fetch("/api/activities");
      if (res.ok) {
        const data = await res.json();
        if (data.activities) {
          setActivities(data.activities);
        }
      }
    } catch (err) {
      console.error("Failed to refresh activities:", err);
    }
  };

  // Handler: Change lead status
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads(prev =>
          prev.map(lead => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
        );
        refreshActivities();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Handler: Delete Lead
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/leads?id=${leadId}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(prev => prev.filter(lead => lead.id !== leadId));
        refreshActivities();
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Handler: Delete Client
  const handleDeleteClient = async (clientId: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      const res = await fetch(`/api/clients?id=${clientId}`, { method: "DELETE" });
      if (res.ok) {
        setClients(prev => prev.filter(client => client.id !== clientId));
        refreshActivities();
      }
    } catch (err) {
      console.error("Failed to delete client:", err);
    }
  };

  // Handler: Create Lead Form Submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadForm),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setLeads(prev => [data.lead, ...prev]);
        setIsLeadModalOpen(false);
        setLeadForm({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          message: "",
          source: "Manual",
          status: "New",
        });
        refreshActivities();
      } else {
        setErrorMessage(data.error || "Failed to create lead");
      }
    } catch (err) {
      setErrorMessage("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler: Create Client Form Submission
  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientForm),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setClients(prev => [...prev, data.client].sort((a,b) => a.name.localeCompare(b.name)));
        setIsClientModalOpen(false);
        setClientForm({ name: "", contact: "" });
        refreshActivities();
      } else {
        setErrorMessage(data.error || "Failed to create client");
      }
    } catch (err) {
      setErrorMessage("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.type.toLowerCase().includes(activitySearch.toLowerCase()) || 
      (activity.description || "").toLowerCase().includes(activitySearch.toLowerCase()) ||
      (activity.user?.name || "").toLowerCase().includes(activitySearch.toLowerCase());
    
    if (activityTypeFilter === "all") return matchesSearch;
    if (activityTypeFilter === "lead") return matchesSearch && activity.type.toLowerCase().includes("lead");
    if (activityTypeFilter === "client") return matchesSearch && activity.type.toLowerCase().includes("client");
    if (activityTypeFilter === "post") return matchesSearch && activity.type.toLowerCase().includes("post");
    if (activityTypeFilter === "system") return matchesSearch && (activity.type.toLowerCase().includes("system") || activity.type.toLowerCase().includes("seed"));
    return matchesSearch;
  });

  const getActivityTypeDetails = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes("lead")) {
      if (lower.includes("delete")) {
        return {
          icon: <Trash2 className="h-4 w-4" />,
          color: "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30 text-rose-500",
          badge: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30"
        };
      }
      if (lower.includes("status")) {
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          color: "bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/30 text-sky-500",
          badge: "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-950/20 dark:text-sky-400 dark:border-sky-900/30"
        };
      }
      return {
        icon: <FolderKanban className="h-4 w-4" />,
        color: "bg-primary/5 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30 text-blue-500",
        badge: "bg-primary/5 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30"
      };
    }
    if (lower.includes("client")) {
      if (lower.includes("delete")) {
        return {
          icon: <Trash2 className="h-4 w-4" />,
          color: "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30 text-rose-500",
          badge: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30"
        };
      }
      return {
        icon: <Users className="h-4 w-4" />,
        color: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30 text-indigo-500",
        badge: "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30"
      };
    }
    if (lower.includes("post")) {
      if (lower.includes("delete")) {
        return {
          icon: <Trash2 className="h-4 w-4" />,
          color: "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30 text-rose-500",
          badge: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30"
        };
      }
      return {
        icon: <FileText className="h-4 w-4" />,
        color: "bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 text-amber-500",
        badge: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30"
      };
    }
    return {
      icon: <Activity className="h-4 w-4" />,
      color: "bg-background border-border dark:bg-slate-900 dark:border-border text-muted-foreground",
      badge: "bg-background text-foreground border-border dark:bg-slate-900/30 dark:text-muted-foreground"
    };
  };


  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "New":
        return "bg-primary/5 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30";
      case "Contacted":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30";
      case "Qualified":
        return "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30";
      case "Closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30";
      default:
        return "bg-background text-foreground border-border dark:bg-slate-900/30 dark:text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* CRM Actions Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border dark:border-border">
        
        {/* Toggle tabs */}
        <div className="flex bg-slate-100/80 dark:bg-slate-900/60 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "leads"
                ? "bg-card dark:bg-slate-800 text-[#0057D9] shadow-sm"
                : "text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-muted-foreground/60"
            }`}
          >
            <FolderKanban className="h-4 w-4" />
            Leads Pipeline ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "clients"
                ? "bg-card dark:bg-slate-800 text-[#0057D9] shadow-sm"
                : "text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-muted-foreground/60"
            }`}
          >
            <Users className="h-4 w-4" />
            Active Clients ({clients.length})
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "activities"
                ? "bg-card dark:bg-slate-800 text-[#0057D9] shadow-sm"
                : "text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-muted-foreground/60"
            }`}
          >
            <Activity className="h-4 w-4" />
            System Audit Trail ({activities.length})
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          {activeTab === "leads" ? (
            <Button
              onClick={() => setIsLeadModalOpen(true)}
              className="h-10 px-5 bg-[#0057D9] hover:bg-[#2563EB] text-white font-bold transition-all duration-200 rounded-xl shadow-sm hover:shadow-[#0057D9]/10"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add New Lead
            </Button>
          ) : activeTab === "clients" ? (
            <Button
              onClick={() => setIsClientModalOpen(true)}
              className="h-10 px-5 bg-[#4F46E5] hover:bg-[#6366F1] text-white font-bold transition-all duration-200 rounded-xl shadow-sm hover:shadow-[#4F46E5]/10"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Client Partner
            </Button>
          ) : (
            <Button
              onClick={refreshActivities}
              className="h-10 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all duration-200 rounded-xl shadow-sm hover:shadow-slate-800/10 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <RefreshCw className="mr-1.5 h-4 w-4" />
              Refresh Logs
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === "leads" ? (
        leads.length === 0 ? (
          <Card className="shadow-sm border border-border bg-card dark:bg-slate-950/20 rounded-3xl overflow-hidden">
            <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-[#F8FAFC] dark:bg-slate-900 border border-border dark:border-border rounded-2xl flex items-center justify-center text-muted-foreground">
                <FolderKanban className="h-7 w-7 text-muted-foreground" />
              </div>
              <div className="max-w-md space-y-2">
                <p className="text-muted-foreground dark:text-muted-foreground/60 font-bold text-lg">No leads currently available</p>
                <p className="text-muted-foreground dark:text-muted-foreground font-semibold text-sm leading-relaxed">
                  Start by capturing leads through the website contact form or click the &quot;Add New Lead&quot; button.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto bg-card dark:bg-slate-950/30 border border-border dark:border-border rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
              <thead className="bg-muted/10 dark:bg-slate-900/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-transparent text-sm font-semibold text-foreground dark:text-muted-foreground/60">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/10 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-[#0A1F44] dark:text-white">{lead.firstName} {lead.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`mailto:${lead.email}`} className="text-[#0057D9] hover:underline font-bold text-xs">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground dark:text-muted-foreground">
                      {lead.company || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                      {lead.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                      {new Date(lead.createdAt).toLocaleDateString("en-IE", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status || "New"}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1 rounded-full border focus:outline-none transition-colors cursor-pointer ${getStatusColor(lead.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-[#0057D9] hover:bg-slate-100/50 dark:hover:bg-slate-900 transition-colors"
                        title="View details"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : activeTab === "clients" ? (
        clients.length === 0 ? (
          <Card className="shadow-sm border border-border bg-card dark:bg-slate-950/20 rounded-3xl overflow-hidden">
            <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-[#F8FAFC] dark:bg-slate-900 border border-border dark:border-border rounded-2xl flex items-center justify-center text-muted-foreground">
                <Users className="h-7 w-7 text-muted-foreground" />
              </div>
              <div className="max-w-md space-y-2">
                <p className="text-muted-foreground dark:text-muted-foreground/60 font-bold text-lg">No client partners currently active</p>
                <p className="text-muted-foreground dark:text-muted-foreground font-semibold text-sm leading-relaxed">
                  Start by adding active client partners to manage connections and SLA compliance.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto bg-card dark:bg-slate-950/30 border border-border dark:border-border rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
              <thead className="bg-muted/10 dark:bg-slate-900/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact Link / Domain</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Date Connected</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">SLA Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-transparent text-sm font-semibold text-foreground dark:text-muted-foreground/60">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-muted/10 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-[#0A1F44] dark:text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] inline-block" />
                        {client.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.contact ? (
                        <a href={`https://${client.contact}`} target="_blank" rel="noopener noreferrer" className="text-[#0057D9] hover:underline font-bold text-xs flex items-center gap-1">
                          <Globe className="h-3 w-3" /> {client.contact}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                      {new Date(client.createdAt).toLocaleDateString("en-IE", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30">
                        <UserCheck className="h-3 w-3" /> Active SLA
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors"
                        title="Delete client"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* System Activity Audit Trail */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 bg-card dark:bg-slate-950/30 border border-border dark:border-border rounded-2xl shadow-sm">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search audit logs..."
                value={activitySearch}
                onChange={(e) => setActivitySearch(e.target.value)}
                className="pl-9 h-9 text-xs bg-muted/10 dark:bg-slate-900 border-border focus-visible:ring-[#0057D9] rounded-xl"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <select
                value={activityTypeFilter}
                onChange={(e) => setActivityTypeFilter(e.target.value)}
                className="h-9 px-3 py-1 text-xs font-bold border border-border dark:border-border bg-muted/10 dark:bg-slate-905 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0057D9] text-foreground dark:text-muted-foreground/60"
              >
                <option value="all">All Activities</option>
                <option value="lead">Leads Pipeline</option>
                <option value="client">Client Partners</option>
                <option value="post">Posts & Content</option>
                <option value="system">System Seeding</option>
              </select>
            </div>
          </div>

          {/* Timeline Wrapper */}
          {filteredActivities.length === 0 ? (
            <Card className="shadow-sm border border-border bg-card dark:bg-slate-950/20 rounded-3xl overflow-hidden">
              <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-[#F8FAFC] dark:bg-slate-900 border border-border dark:border-border rounded-2xl flex items-center justify-center text-muted-foreground">
                  <Activity className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="max-w-md space-y-2">
                  <p className="text-muted-foreground dark:text-muted-foreground/60 font-bold text-lg">No activities found</p>
                  <p className="text-muted-foreground dark:text-muted-foreground font-semibold text-sm leading-relaxed">
                    Try adjusting your search filters or trigger a new lead/client action to see logs.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="relative border border-border dark:border-border bg-card dark:bg-slate-950/30 rounded-2xl p-6 shadow-sm overflow-hidden">
              {/* Vertical line through timeline */}
              <div className="absolute left-9 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-border dark:border-border" />
              
              <div className="space-y-8 relative">
                {filteredActivities.map((activity) => {
                  const details = getActivityTypeDetails(activity.type);
                  return (
                    <div key={activity.id} className="flex gap-6 items-start group">
                      {/* Icon Circle */}
                      <div className={`relative z-10 flex items-center justify-center h-7 w-7 rounded-full border shadow-sm shrink-0 transition-all duration-200 group-hover:scale-110 ${details.color}`}>
                        {details.icon}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 bg-muted/10 dark:bg-slate-900/40 border border-border dark:border-border rounded-2xl p-4 transition-all duration-200 group-hover:bg-muted/10 dark:group-hover:bg-slate-900/60 group-hover:border-border dark:group-hover:border-border group-hover:shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-[#0A1F44] dark:text-white text-sm">
                              {activity.type}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${details.badge}`}>
                              {activity.type.toLowerCase().includes("lead") ? "Lead" : 
                               activity.type.toLowerCase().includes("client") ? "Client" :
                               activity.type.toLowerCase().includes("post") ? "Content" : "System"}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                            <Clock className="h-3 w-3" />
                            {new Date(activity.createdAt).toLocaleString("en-IE", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit"
                            })}
                          </div>
                        </div>

                        {activity.description && (
                          <p className="text-muted-foreground dark:text-slate-350 text-xs font-semibold leading-relaxed mb-3">
                            {activity.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-muted-foreground dark:text-muted-foreground/60 font-bold border border-border dark:border-border">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{activity.user?.name || "System Admin"}</span>
                          </div>
                          {activity.user?.email && (
                            <span className="text-[10px] font-semibold opacity-75">
                              ({activity.user.email})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: Add Lead Modal */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/75 backdrop-blur-[3px] flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-card dark:bg-slate-950 rounded-3xl shadow-xl border border-border dark:border-border overflow-hidden relative">
            <button
              onClick={() => setIsLeadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-muted-foreground hover:text-muted-foreground dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 border-b border-border dark:border-border">
              <h3 className="text-xl font-extrabold text-[#0A1F44] dark:text-white">Add New Lead Profile</h3>
              <p className="text-xs font-semibold text-muted-foreground mt-1">Manually insert a potential client profile.</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
                  {errorMessage}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName" className="text-xs font-bold text-foreground dark:text-muted-foreground">First Name</Label>
                  <Input
                    id="firstName"
                    required
                    value={leadForm.firstName}
                    onChange={(e) => setLeadForm({ ...leadForm, firstName: e.target.value })}
                    className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName" className="text-xs font-bold text-foreground dark:text-muted-foreground">Last Name</Label>
                  <Input
                    id="lastName"
                    required
                    value={leadForm.lastName}
                    onChange={(e) => setLeadForm({ ...leadForm, lastName: e.target.value })}
                    className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs font-bold text-foreground dark:text-muted-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="company" className="text-xs font-bold text-foreground dark:text-muted-foreground">Company Name</Label>
                <Input
                  id="company"
                  value={leadForm.company}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="source" className="text-xs font-bold text-foreground dark:text-muted-foreground">Lead Source</Label>
                  <select
                    id="source"
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                    className="w-full h-10 px-3 border border-border dark:border-border bg-muted/10 dark:bg-slate-900 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0057D9]"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Website Contact Form">Website Contact Form</option>
                    <option value="Referral">Referral</option>
                    <option value="Outreach">Outreach</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status" className="text-xs font-bold text-foreground dark:text-muted-foreground">Pipeline Status</Label>
                  <select
                    id="status"
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value })}
                    className="w-full h-10 px-3 border border-border dark:border-border bg-muted/10 dark:bg-slate-900 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0057D9]"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs font-bold text-foreground dark:text-muted-foreground">Requirements / Notes</Label>
                <Textarea
                  id="message"
                  value={leadForm.message}
                  onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                  className="min-h-[80px] text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="h-10 rounded-xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 bg-[#0057D9] hover:bg-[#2563EB] text-white font-bold rounded-xl"
                >
                  {isLoading ? "Inserting..." : "Insert Lead"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* MODAL 2: Add Client Modal */}
      {isClientModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/75 backdrop-blur-[3px] flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-card dark:bg-slate-950 rounded-3xl shadow-xl border border-border dark:border-border overflow-hidden relative">
            <button
              onClick={() => setIsClientModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-muted-foreground hover:text-muted-foreground dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 border-b border-border dark:border-border">
              <h3 className="text-xl font-extrabold text-[#0A1F44] dark:text-white">Add Active Client Partner</h3>
              <p className="text-xs font-semibold text-muted-foreground mt-1">Insert a verified corporate account.</p>
            </div>
            <form onSubmit={handleClientSubmit} className="p-6 space-y-4">
              {errorMessage && (
                <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-1">
                <Label htmlFor="clientName" className="text-xs font-bold text-foreground dark:text-muted-foreground">Client / Company Name</Label>
                <Input
                  id="clientName"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  placeholder="e.g. Pfizer, Astellas"
                  className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#4F46E5]"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="clientContact" className="text-xs font-bold text-foreground dark:text-muted-foreground">Contact Domain / URL</Label>
                <Input
                  id="clientContact"
                  value={clientForm.contact}
                  onChange={(e) => setClientForm({ ...clientForm, contact: e.target.value })}
                  placeholder="e.g. pfizer.com"
                  className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#4F46E5]"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsClientModalOpen(false)}
                  className="h-10 rounded-xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 bg-[#4F46E5] hover:bg-[#6366F1] text-white font-bold rounded-xl"
                >
                  {isLoading ? "Saving..." : "Save Client"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* DETAIL MODAL: Lead Requirements detail */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/75 backdrop-blur-[3px] flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-card dark:bg-slate-950 rounded-3xl shadow-xl border border-border dark:border-border overflow-hidden relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-muted-foreground hover:text-muted-foreground dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 border-b border-border dark:border-border">
              <span className={`inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border mb-2 ${getStatusColor(selectedLead.status)}`}>
                {selectedLead.status}
              </span>
              <h3 className="text-xl font-extrabold text-[#0A1F44] dark:text-white">
                {selectedLead.firstName} {selectedLead.lastName}
              </h3>
              <p className="text-xs font-semibold text-[#0057D9] mt-0.5">{selectedLead.email}</p>
              {selectedLead.company && (
                <p className="text-xs font-bold text-muted-foreground mt-1">Company: {selectedLead.company}</p>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Project Requirements / Messages</h4>
                <div className="p-4 bg-background dark:bg-slate-900 border border-border dark:border-border rounded-2xl text-foreground dark:text-muted-foreground/60 text-sm leading-relaxed white-space-pre-wrap min-h-[100px]">
                  {selectedLead.message || "No message requirements provided."}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground pt-2">
                <span>Source: {selectedLead.source}</span>
                <span>Date: {new Date(selectedLead.createdAt).toLocaleString("en-IE")}</span>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setSelectedLead(null)}
                  className="h-10 bg-[#0A1F44] hover:bg-slate-800 text-white font-bold rounded-xl px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
