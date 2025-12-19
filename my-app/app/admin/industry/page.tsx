"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Box,
  Plus,
  Trash2,
  X,
  ArrowLeft,
  Search,
  CheckCircle2,
  LayoutGrid,
  Save,
  Check,
  Edit3,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  FileText,
  Loader2,
  CheckSquare,
  Square,
  Hash,
  Link as LinkIcon,
  Code
} from "lucide-react";

type Module = {
  id: string;
  name: string;
  type: "Core" | "AI" | "Analytics" | string;
  description: string;
};

type Industry = {
  id: string;
  name: string;
  modules: string[];
  keywords: string[];
  urls: string[];
  selectors: string[];
};

const generateData = () => {
  const industries: Industry[] = Array.from({ length: 50 }, (_, i) => ({
    id: `ind-${i}`,
    name: `Industry Sector ${i + 1}`,
    modules: [`mod-${i}`, `mod-${i + 1}`],
    keywords: [`keyword${i + 1}`],
    urls: i % 5 === 0 ? [`https://example.com/industry/${i}`] : [],
    selectors: i % 7 === 0 ? [".title", ".price"] : []
  }));

  const modules: Module[] = Array.from({ length: 100 }, (_, i) => ({
    id: `mod-${i}`,
    name: `Module Feature ${i + 1}`,
    type: i % 3 === 0 ? "Core" : i % 3 === 1 ? "AI" : "Analytics",
    description: "Automated data extraction and processing unit."
  }));

  return { industries, modules };
};

const { industries: INITIAL_INDUSTRIES, modules: INITIAL_MODULES } = generateData();

const Toast = ({
  message,
  type,
  onClose
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    className={`fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[60] backdrop-blur-md border ${
      type === "success"
        ? "bg-slate-900 text-white border-slate-800"
        : "bg-red-500 text-white border-red-600"
    }`}
  >
    {type === "success" ? (
      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-white" />
    )}
    <span className="font-bold text-sm">{message}</span>
    <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

const TagPreview = ({
  items,
  tone = "slate",
  limit = 8
}: {
  items: string[];
  tone?: "slate" | "orange" | "blue" | "purple";
  limit?: number;
}) => {
  const cls =
    tone === "orange"
      ? "bg-orange-50 border-orange-200 text-orange-700"
      : tone === "blue"
      ? "bg-blue-50 border-blue-200 text-blue-700"
      : tone === "purple"
      ? "bg-purple-50 border-purple-200 text-purple-700"
      : "bg-slate-100 border-slate-200 text-slate-700";

  const slice = items.slice(0, limit);
  const remaining = Math.max(0, items.length - slice.length);

  return (
    <div className="flex flex-wrap gap-2">
      {slice.map((t) => (
        <div
          key={t}
          className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border ${cls}`}
          title={t}
        >
          <span className="text-xs font-bold truncate max-w-[180px]">{t}</span>
        </div>
      ))}
      {items.length === 0 && <span className="text-xs text-slate-400 font-bold">No items yet</span>}
      {remaining > 0 && (
        <span className="text-xs font-black text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
          +{remaining} more
        </span>
      )}
    </div>
  );
};

function AddOneModal({
  isOpen,
  title,
  placeholder,
  icon: Icon,
  tone,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  title: string;
  placeholder: string;
  icon: any;
  tone: "orange" | "blue" | "purple";
  onClose: () => void;
  onAdd: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!isOpen) setValue("");
  }, [isOpen]);

  const ring =
    tone === "orange"
      ? "focus:ring-orange-500/10 focus:border-orange-500"
      : tone === "blue"
      ? "focus:ring-blue-500/10 focus:border-blue-500"
      : "focus:ring-purple-500/10 focus:border-purple-500";

  const handleAdd = () => {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-100"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Icon className="w-5 h-5" /> {title}
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-400 hover:text-slate-900" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Value</label>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            placeholder={placeholder}
            className={`w-full bg-slate-50 border border-transparent focus:bg-white focus:ring-4 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all ${ring}`}
          />
          <p className="text-[11px] text-slate-400 font-medium">Press Enter to add.</p>

          <button
            onClick={handleAdd}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-900/20 mt-2"
          >
            Add
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function SimpleVirtualList({
  items,
  height = 420,
  rowHeight = 44,
  renderRow
}: {
  items: string[];
  height?: number;
  rowHeight?: number;
  renderRow: (value: string) => React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * rowHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 8);
  const visibleCount = Math.ceil(height / rowHeight) + 16;
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const slice = items.slice(startIndex, endIndex);
  const offsetY = startIndex * rowHeight;

  return (
    <div
      style={{ height }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      className="overflow-y-auto"
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {slice.map((v) => (
            <div key={v} style={{ height: rowHeight }} className="px-3 py-1">
              {renderRow(v)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManageLargeListModal({
  isOpen,
  title,
  icon: Icon,
  tone,
  items,
  required,
  onClose,
  onRemove,
  onClear,
  onBulkAdd
}: {
  isOpen: boolean;
  title: string;
  icon: any;
  tone: "orange" | "blue" | "purple";
  items: string[];
  required?: boolean;
  onClose: () => void;
  onRemove: (value: string) => void;
  onClear: () => void;
  onBulkAdd: (values: string[]) => void;
}) {
  const [q, setQ] = useState("");
  const [bulk, setBulk] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setQ("");
      setBulk("");
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) => x.toLowerCase().includes(s));
  }, [items, q]);

  const ring =
    tone === "orange"
      ? "focus:ring-orange-500/10 focus:border-orange-500"
      : tone === "blue"
      ? "focus:ring-blue-500/10 focus:border-blue-500"
      : "focus:ring-purple-500/10 focus:border-purple-500";

  const toneBadge =
    tone === "orange"
      ? "bg-orange-100 text-orange-700"
      : tone === "blue"
      ? "bg-blue-100 text-blue-700"
      : "bg-purple-100 text-purple-700";

  const handleBulkAdd = () => {
    const text = bulk.trim();
    if (!text) return;

    const values = text
      .split(/\r?\n|,/g)
      .map((s) => s.trim())
      .filter(Boolean);

    if (values.length === 0) return;
    onBulkAdd(values);
    setBulk("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-100"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className={`px-2 py-1 rounded-lg text-xs font-black ${toneBadge}`}>{items.length}</div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Icon className="w-5 h-5" /> {title}
              {required && <span className="text-xs font-black text-orange-600">(required)</span>}
            </h3>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-400 hover:text-slate-900" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent focus:bg-white focus:ring-4 rounded-xl text-sm font-bold text-slate-900 outline-none transition-all ${ring}`}
              />
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl py-3">
              <SimpleVirtualList
                items={filtered}
                height={420}
                rowHeight={44}
                renderRow={(value) => (
                  <div className="h-[40px] flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 shadow-sm">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-800 truncate">{value}</div>
                    </div>
                    <button
                      onClick={() => onRemove(value)}
                      className="text-slate-400 hover:text-red-600 transition-colors ml-3"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              />
              {filtered.length === 0 && (
                <div className="px-6 py-10 text-center text-slate-400 font-bold text-sm">No matches.</div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClear}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-black text-slate-700"
              >
                Clear all
              </button>
              <button
                onClick={onClose}
                className="ml-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-black text-white"
              >
                Done
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-black text-slate-700 uppercase tracking-wide">Bulk add</div>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                Paste values separated by new lines or commas.
              </p>

              <textarea
                value={bulk}
                onChange={(e) => setBulk(e.target.value)}
                rows={10}
                placeholder={`value1\nvalue2\nvalue3`}
                className={`mt-3 w-full bg-slate-50 border border-transparent focus:bg-white focus:ring-4 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none transition-all resize-none ${ring}`}
              />

              <button
                onClick={handleBulkAdd}
                className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-slate-900/20"
              >
                Add all
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  const [industries, setIndustries] = useState<Industry[]>(INITIAL_INDUSTRIES);
  const [modules] = useState<Module[]>(INITIAL_MODULES);

  const [industryName, setIndustryName] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [selectors, setSelectors] = useState<string[]>([]);

  const [toasts, setToasts] = useState<{ id: number; msg: string; type: "success" | "error" }[]>([]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  const [moduleSearch, setModuleSearch] = useState("");
  const filteredModules = useMemo(() => {
    const s = moduleSearch.toLowerCase();
    return modules.filter((m) => m.name.toLowerCase().includes(s) || m.type.toLowerCase().includes(s));
  }, [modules, moduleSearch]);

  const areAllFilteredSelected = useMemo(() => {
    if (filteredModules.length === 0) return false;
    return filteredModules.every((m) => selectedModules.includes(m.id));
  }, [filteredModules, selectedModules]);

  const [industrySearch, setIndustrySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const filteredIndustries = useMemo(() => {
    return industries.filter((i) => i.name.toLowerCase().includes(industrySearch.toLowerCase()));
  }, [industries, industrySearch]);

  useEffect(() => setCurrentPage(1), [industrySearch]);

  const paginatedIndustries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredIndustries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredIndustries, currentPage]);

  const totalPages = Math.ceil(filteredIndustries.length / ITEMS_PER_PAGE);

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [addKeywordOpen, setAddKeywordOpen] = useState(false);
  const [addUrlOpen, setAddUrlOpen] = useState(false);
  const [addSelectorOpen, setAddSelectorOpen] = useState(false);

  const [manageKeywordsOpen, setManageKeywordsOpen] = useState(false);
  const [manageUrlsOpen, setManageUrlsOpen] = useState(false);
  const [manageSelectorsOpen, setManageSelectorsOpen] = useState(false);

  const [generatingReports, setGeneratingReports] = useState<Record<string, boolean>>({});

  const addUnique = (list: string[], value: string) => {
    const v = value.trim();
    if (!v) return list;
    if (list.some((x) => x.toLowerCase() === v.toLowerCase())) return list;
    return [...list, v];
  };

  const bulkAddUnique = (list: string[], values: string[]) => {
    const seen = new Set(list.map((x) => x.toLowerCase()));
    const out = [...list];
    for (const raw of values) {
      const v = raw.trim();
      if (!v) continue;
      const key = v.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(v);
    }
    return out;
  };

  const addKeyword = (v: string) => {
    const trimmed = v.trim();
    if (!trimmed) return;
    if (keywords.some((x) => x.toLowerCase() === trimmed.toLowerCase()))
      return showToast("Keyword already exists", "error");
    setKeywords((prev) => [...prev, trimmed]);
    showToast(`Keyword added: ${trimmed}`, "success");
  };

  const addUrl = (v: string) => {
    const trimmed = v.trim();
    if (!trimmed) return;
    if (urls.some((x) => x.toLowerCase() === trimmed.toLowerCase()))
      return showToast("URL already exists", "error");
    setUrls((prev) => [...prev, trimmed]);
    showToast(`URL added: ${trimmed}`, "success");
  };

  const addSelector = (v: string) => {
    const trimmed = v.trim();
    if (!trimmed) return;
    if (selectors.some((x) => x.toLowerCase() === trimmed.toLowerCase()))
      return showToast("Selector already exists", "error");
    setSelectors((prev) => [...prev, trimmed]);
    showToast(`Selector added: ${trimmed}`, "success");
  };

  const removeKeyword = (v: string) => setKeywords((prev) => prev.filter((x) => x !== v));
  const removeUrl = (v: string) => setUrls((prev) => prev.filter((x) => x !== v));
  const removeSelector = (v: string) => setSelectors((prev) => prev.filter((x) => x !== v));

  const clearKeywords = () => setKeywords([]);
  const clearUrls = () => setUrls([]);
  const clearSelectors = () => setSelectors([]);

  // FIXED: bulk add using functional setters (no stale state)
  const bulkAddKeywords = (vals: string[]) => {
    setKeywords((prev) => {
      const next = bulkAddUnique(prev, vals);
      const added = next.length - prev.length;
      showToast(
        added > 0 ? `Added ${added} keywords` : "No new keywords to add",
        added > 0 ? "success" : "error"
      );
      return next;
    });
  };

  const bulkAddUrls = (vals: string[]) => {
    setUrls((prev) => {
      const next = bulkAddUnique(prev, vals);
      const added = next.length - prev.length;
      showToast(added > 0 ? `Added ${added} URLs` : "No new URLs to add", added > 0 ? "success" : "error");
      return next;
    });
  };

  const bulkAddSelectors = (vals: string[]) => {
    setSelectors((prev) => {
      const next = bulkAddUnique(prev, vals);
      const added = next.length - prev.length;
      showToast(
        added > 0 ? `Added ${added} selectors` : "No new selectors to add",
        added > 0 ? "success" : "error"
      );
      return next;
    });
  };

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (filteredModules.length === 0) return;
    const ids = filteredModules.map((m) => m.id);
    if (areAllFilteredSelected) {
      setSelectedModules((prev) => prev.filter((id) => !ids.includes(id)));
      showToast("Unselected all filtered modules", "success");
    } else {
      setSelectedModules((prev) => Array.from(new Set([...prev, ...ids])));
      showToast("Selected all filtered modules", "success");
    }
  };

  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    e.dataTransfer.setData("moduleId", moduleId);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const moduleId = e.dataTransfer.getData("moduleId");
    if (moduleId && !selectedModules.includes(moduleId)) {
      setSelectedModules((prev) => [...prev, moduleId]);
      showToast("Module added", "success");
    }
  };

  const resetForm = () => {
    setIndustryName("");
    setSelectedModules([]);
    setKeywords([]);
    setUrls([]);
    setSelectors([]);
    setIsEditingId(null);
    setActiveTab("manage");
  };

  const handleSaveIndustry = () => {
    if (!industryName.trim()) return showToast("Industry name is required", "error");
    if (keywords.length === 0) return showToast("At least 1 keyword is required", "error");
    if (selectedModules.length === 0) return showToast("Select at least 1 module", "error");

    const exists = industries.some(
      (i) => i.name.toLowerCase() === industryName.trim().toLowerCase() && i.id !== isEditingId
    );
    if (exists) return showToast("Industry name already exists", "error");

    if (isEditingId) {
      setIndustries((prev) =>
        prev.map((ind) =>
          ind.id === isEditingId
            ? { ...ind, name: industryName.trim(), modules: selectedModules, keywords, urls, selectors }
            : ind
        )
      );
      showToast("Industry updated successfully");
    } else {
      setIndustries((prev) => [
        { id: `ind-new-${Date.now()}`, name: industryName.trim(), modules: selectedModules, keywords, urls, selectors },
        ...prev
      ]);
      showToast("Industry created successfully");
    }

    resetForm();
  };

  const handleEditClick = (industry: Industry) => {
    setIndustryName(industry.name);
    setSelectedModules(industry.modules);
    setKeywords(industry.keywords || []);
    setUrls(industry.urls || []);
    setSelectors(industry.selectors || []);
    setIsEditingId(industry.id);
    setActiveTab("create");
  };

  const handleDeleteIndustry = (id: string) => {
    setIndustries((prev) => prev.filter((i) => i.id !== id));
    showToast("Industry deleted");
    if (isEditingId === id) resetForm();
  };

  const handleGenerateReport = (industryId: string, name: string) => {
    const ind = industries.find((i) => i.id === industryId);
    if (!ind) return;
    if (!ind.keywords?.length) return showToast("Cannot generate report: keywords missing", "error");

    setGeneratingReports((prev) => ({ ...prev, [industryId]: true }));
    showToast(`Generating analysis for ${name}...`);

    setTimeout(() => {
      setGeneratingReports((prev) => ({ ...prev, [industryId]: false }));
      showToast(`Report for ${name} ready`, "success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col">
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.msg}
            type={t.type}
            onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          />
        ))}
      </AnimatePresence>

      <AddOneModal
        isOpen={addKeywordOpen}
        title="Add Keyword"
        placeholder="e.g. pricing"
        icon={Hash}
        tone="orange"
        onClose={() => setAddKeywordOpen(false)}
        onAdd={addKeyword}
      />
      <AddOneModal
        isOpen={addUrlOpen}
        title="Add URL"
        placeholder="https://example.com/page"
        icon={LinkIcon}
        tone="blue"
        onClose={() => setAddUrlOpen(false)}
        onAdd={addUrl}
      />
      <AddOneModal
        isOpen={addSelectorOpen}
        title="Add CSS Selector"
        placeholder=".price"
        icon={Code}
        tone="purple"
        onClose={() => setAddSelectorOpen(false)}
        onAdd={addSelector}
      />

      <ManageLargeListModal
        isOpen={manageKeywordsOpen}
        title="Manage Keywords"
        icon={Hash}
        tone="orange"
        items={keywords}
        required
        onClose={() => setManageKeywordsOpen(false)}
        onRemove={removeKeyword}
        onClear={clearKeywords}
        onBulkAdd={bulkAddKeywords}
      />
      <ManageLargeListModal
        isOpen={manageUrlsOpen}
        title="Manage URLs"
        icon={LinkIcon}
        tone="blue"
        items={urls}
        onClose={() => setManageUrlsOpen(false)}
        onRemove={removeUrl}
        onClear={clearUrls}
        onBulkAdd={bulkAddUrls}
      />
      <ManageLargeListModal
        isOpen={manageSelectorsOpen}
        title="Manage CSS Selectors"
        icon={Code}
        tone="purple"
        items={selectors}
        onClose={() => setManageSelectorsOpen(false)}
        onRemove={removeSelector}
        onClear={clearSelectors}
        onBulkAdd={bulkAddSelectors}
      />

      <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-500" />
              {isEditingId ? "Edit Industry" : "Industry Manager"}
            </h1>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "create" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {isEditingId ? "Editing..." : "Create New"}
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "manage" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Manage Existing
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 flex flex-col">
        {activeTab === "create" ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-black text-slate-900">1. Industry Details</h2>
                  {isEditingId && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">
                      EDIT MODE
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">
                      Industry Name
                    </label>
                    <input
                      type="text"
                      value={industryName}
                      onChange={(e) => setIndustryName(e.target.value)}
                      placeholder="e.g. Automotive & Mobility"
                      className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none transition-all"
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wide">
                          Keywords <span className="text-orange-600">*</span>
                        </span>
                        <span className="ml-2 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md text-[10px] font-black">
                          {keywords.length}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAddKeywordOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-2 transition-all shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                        <button
                          onClick={() => setManageKeywordsOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 transition-all shadow-sm"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                    <TagPreview items={keywords} tone="orange" limit={8} />
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wide">URLs (Optional)</span>
                        <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-[10px] font-black">
                          {urls.length}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAddUrlOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-2 transition-all shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                        <button
                          onClick={() => setManageUrlsOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 transition-all shadow-sm"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                    <TagPreview items={urls} tone="blue" limit={6} />
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-black text-slate-700 uppercase tracking-wide">
                          CSS Selectors (Optional)
                        </span>
                        <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-[10px] font-black">
                          {selectors.length}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAddSelectorOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-2 transition-all shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                        <button
                          onClick={() => setManageSelectorsOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 transition-all shadow-sm"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                    <TagPreview items={selectors} tone="purple" limit={8} />
                  </div>
                </div>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingOver(true);
                }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={handleDrop}
                className={`min-h-[420px] bg-white p-6 rounded-2xl border-2 shadow-sm flex flex-col transition-all duration-300 ${
                  isDraggingOver ? "border-orange-400 bg-orange-50/50 border-dashed scale-[1.01]" : "border-slate-200 border-solid"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-black text-slate-900">2. Selected Modules</h2>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">
                    {selectedModules.length} Active
                  </span>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <AnimatePresence>
                    {selectedModules.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center text-slate-400"
                      >
                        <LayoutGrid className={`w-8 h-8 mb-2 ${isDraggingOver ? "text-orange-500 animate-bounce" : "opacity-50"}`} />
                        <p className="text-xs font-bold">{isDraggingOver ? "Drop Module Here!" : "Drag & drop modules here"}</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-2">
                        {selectedModules.map((id) => {
                          const mod = modules.find((m) => m.id === id);
                          if (!mod) return null;
                          return (
                            <motion.div
                              key={id}
                              layout
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm group"
                            >
                              <span className="text-xs font-bold text-slate-700">{mod.name}</span>
                              <button
                                onClick={() => toggleModule(id)}
                                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-4 flex gap-3">
                  {isEditingId && (
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-4 rounded-xl transition-all text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleSaveIndustry}
                    disabled={!industryName.trim() || selectedModules.length === 0 || keywords.length === 0}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all text-sm flex items-center justify-center gap-2 transform active:scale-[0.98]"
                  >
                    <Save className="w-4 h-4" /> {isEditingId ? "Update Industry" : "Save Industry"}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-black text-slate-900">3. Available Modules</h2>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={moduleSearch}
                      onChange={(e) => setModuleSearch(e.target.value)}
                      placeholder="Search by name or tag..."
                      className="w-full pl-10 pr-32 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                    <button
                      onClick={handleSelectAll}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-2 transition-all shadow-sm"
                    >
                      {areAllFilteredSelected ? (
                        <>
                          <CheckSquare className="w-3.5 h-3.5 text-blue-500" /> All Selected
                        </>
                      ) : (
                        <>
                          <Square className="w-3.5 h-3.5 text-slate-300" /> Select All
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/30">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredModules.map((mod) => {
                    const isSelected = selectedModules.includes(mod.id);
                    return (
                      <div
                        key={mod.id}
                        draggable="true"
                        onDragStart={(e: any) => handleDragStart(e, mod.id)}
                        onClick={() => toggleModule(mod.id)}
                        className={`cursor-grab active:cursor-grabbing group relative p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10"
                            : "border-white bg-white shadow-sm hover:border-blue-200 hover:shadow-md"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                            }`}
                          >
                            {isSelected ? <Check className="w-5 h-5" /> : <Box className="w-4 h-4" />}
                          </div>
                          <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <h3 className={`font-bold text-sm ${isSelected ? "text-blue-900" : "text-slate-900"}`}>
                          {mod.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{mod.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-140px)]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-900">Existing Industries</h2>
              <div className="w-72 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={industrySearch}
                  onChange={(e) => setIndustrySearch(e.target.value)}
                  placeholder="Search industries..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500/20 outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide w-[40%]">
                      Industry Name
                    </th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide">Modules</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide">Keywords</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide">URLs</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide">Selectors</th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wide text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedIndustries.map((ind) => (
                    <tr key={ind.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4 font-bold text-sm">{ind.name}</td>
                      <td className="px-6 py-4 text-xs font-bold">{ind.modules.length}</td>
                      <td className="px-6 py-4 text-xs font-bold">{ind.keywords.length}</td>
                      <td className="px-6 py-4 text-xs font-bold">{ind.urls.length}</td>
                      <td className="px-6 py-4 text-xs font-bold">{ind.selectors.length}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleGenerateReport(ind.id, ind.name)}
                            disabled={generatingReports[ind.id]}
                            className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Generate Report"
                          >
                            {generatingReports[ind.id] ? (
                              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEditClick(ind)}
                            className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteIndustry(ind.id)}
                            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedIndustries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-bold">
                        No industries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="text-xs font-bold text-slate-400">
                Showing {paginatedIndustries.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} -{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredIndustries.length)} of {filteredIndustries.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-600">
                  Page {currentPage} of {Math.max(1, totalPages)}
                </span>
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
