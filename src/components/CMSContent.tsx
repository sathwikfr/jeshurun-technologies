"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Newspaper, Trash2, Eye, EyeOff, X, Sparkles, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tag: string | null;
  excerpt: string | null;
  content: string;
  readTime: string | null;
  published: boolean;
  createdAt: string;
  author: {
    name: string | null;
  };
}

interface CMSContentProps {
  initialPosts: BlogPost[];
}

export function CMSContent({ initialPosts }: CMSContentProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Cloud",
    tag: "Insight",
    excerpt: "",
    content: "",
    readTime: "5 min read",
    published: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-generate slug from title
  const handleTitleChange = (titleVal: string) => {
    const generatedSlug = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Avoid multiple hyphens
      .trim();
    
    setForm(prev => ({
      ...prev,
      title: titleVal,
      slug: generatedSlug
    }));
  };

  // Toggle published status
  const handleTogglePublish = async (postId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, published: !currentStatus }),
      });
      if (res.ok) {
        setPosts(prev =>
          prev.map(p => (p.id === postId ? { ...p, published: !currentStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    }
  };

  // Delete post
  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/posts?id=${postId}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== postId));
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setPosts(prev => [data.post, ...prev]);
        setIsModalOpen(false);
        setForm({
          title: "",
          slug: "",
          category: "Cloud",
          tag: "Insight",
          excerpt: "",
          content: "",
          readTime: "5 min read",
          published: false,
        });
      } else {
        setErrorMessage(data.error || "Failed to create post");
      }
    } catch (err) {
      setErrorMessage("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* CMS Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-border dark:border-border">
        <div>
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Article Dashboard</span>
          <h2 className="text-xl font-extrabold text-[#0A1F44] dark:text-white mt-0.5">Manage All Posts</h2>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-10 px-5 bg-[#0057D9] hover:bg-[#2563EB] text-white font-bold transition-all duration-200 rounded-xl shadow-sm hover:shadow-[#0057D9]/10"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Posts Table */}
      {posts.length === 0 ? (
        <Card className="shadow-sm border border-border bg-card dark:bg-slate-950/20 rounded-3xl overflow-hidden">
          <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 bg-[#F8FAFC] dark:bg-slate-900 border border-border dark:border-border rounded-2xl flex items-center justify-center text-muted-foreground">
              <Newspaper className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="max-w-md space-y-2">
              <p className="text-muted-foreground dark:text-muted-foreground/60 font-bold text-lg">No posts currently available</p>
              <p className="text-muted-foreground dark:text-muted-foreground font-semibold text-sm leading-relaxed">
                Start by creating your first insight, research report, or guide using the &quot;Create Post&quot; button above.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto bg-card dark:bg-slate-950/30 border border-border dark:border-border rounded-2xl shadow-sm">
          <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
            <thead className="bg-muted/10 dark:bg-slate-900/40">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-transparent text-sm font-semibold text-foreground dark:text-muted-foreground/60">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-muted/10 dark:hover:bg-slate-900/10 transition-colors">
                  <td className="px-6 py-4 max-w-xs">
                    <div className="font-bold text-[#0A1F44] dark:text-white truncate" title={post.title}>
                      {post.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-medium">/{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs bg-slate-100 text-muted-foreground dark:bg-slate-900 dark:text-muted-foreground border border-border dark:border-border px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground dark:text-muted-foreground text-xs">
                    {post.author?.name || "Jeshurun Editorial"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-xs">
                    {new Date(post.createdAt).toLocaleDateString("en-IE", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all ${
                        post.published
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50 dark:bg-emerald-950/20 dark:text-emerald-400"
                          : "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100/50 dark:bg-amber-950/20 dark:text-amber-400"
                      }`}
                      title={post.published ? "Click to Unpublish" : "Click to Publish"}
                    >
                      {post.published ? (
                        <>
                          <Eye className="h-3.5 w-3.5" /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5" /> Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-[#0057D9] hover:bg-slate-100/50 dark:hover:bg-slate-900 transition-colors"
                      title="Preview content"
                    >
                      <BookOpen className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE MODAL: Add Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/75 backdrop-blur-[3px] flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-card dark:bg-slate-950 rounded-3xl shadow-xl border border-border dark:border-border overflow-hidden relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-muted-foreground hover:text-muted-foreground dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 border-b border-border dark:border-border">
              <h3 className="text-xl font-extrabold text-[#0A1F44] dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#0057D9]" /> Create New Insight Article
              </h3>
              <p className="text-xs font-semibold text-muted-foreground mt-1">Publish an editorial review or engineering paper.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {errorMessage && (
                <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg text-center">
                  {errorMessage}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="title" className="text-xs font-bold text-foreground dark:text-muted-foreground">Post Title</Label>
                  <Input
                    id="title"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Why security architectures fail..."
                    className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="slug" className="text-xs font-bold text-foreground dark:text-muted-foreground">URL Slug</Label>
                  <Input
                    id="slug"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="why-security-fails"
                    className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="category" className="text-xs font-bold text-foreground dark:text-muted-foreground">Category</Label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-10 px-3 border border-border dark:border-border bg-muted/10 dark:bg-slate-900 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0057D9]"
                  >
                    <option value="Cloud">Cloud</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Security">Security</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Consulting">Consulting</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="tag" className="text-xs font-bold text-foreground dark:text-muted-foreground">Tag / Label</Label>
                  <select
                    id="tag"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full h-10 px-3 border border-border dark:border-border bg-muted/10 dark:bg-slate-900 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0057D9]"
                  >
                    <option value="Research Report">Research Report</option>
                    <option value="White Paper">White Paper</option>
                    <option value="Guide">Guide</option>
                    <option value="Insight">Insight</option>
                    <option value="Case Study">Case Study</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="readTime" className="text-xs font-bold text-foreground dark:text-muted-foreground">Read Time</Label>
                  <Input
                    id="readTime"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g. 8 min read"
                    className="h-10 text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="excerpt" className="text-xs font-bold text-foreground dark:text-muted-foreground">Short Summary (Excerpt)</Label>
                <Textarea
                  id="excerpt"
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Enter a brief 1-2 sentence description of the article..."
                  className="min-h-[60px] text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="content" className="text-xs font-bold text-foreground dark:text-muted-foreground">Full Content (Markdown format supported)</Label>
                <Textarea
                  id="content"
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="## Heading 2\n\nWrite your blog content here..."
                  className="min-h-[160px] text-xs bg-muted/10 border-border focus-visible:ring-[#0057D9]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0057D9] focus:ring-[#0057D9] cursor-pointer"
                />
                <Label htmlFor="published" className="text-xs font-bold text-foreground dark:text-slate-350 cursor-pointer select-none">
                  Publish immediately (Visible publically on /blog)
                </Label>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-border dark:border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="h-10 rounded-xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 bg-[#0057D9] hover:bg-[#2563EB] text-white font-bold rounded-xl px-5"
                >
                  {isLoading ? "Publishing..." : "Save Post"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* ARTICLE PREVIEW MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/75 backdrop-blur-[3px] flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-card dark:bg-slate-950 rounded-3xl shadow-xl border border-border dark:border-border overflow-hidden relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-muted-foreground hover:text-muted-foreground dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 border-b border-border dark:border-border">
              <div className="flex gap-2 mb-2 items-center">
                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-slate-100 dark:bg-slate-900 border border-border dark:border-border px-2.5 py-0.5 rounded-full text-muted-foreground">
                  {selectedPost.tag}
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#0057D9]">
                  {selectedPost.category}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0A1F44] dark:text-white">
                {selectedPost.title}
              </h3>
              <p className="text-xs font-semibold text-muted-foreground mt-1">
                Author: {selectedPost.author?.name || "Jeshurun Editorial"} | Read Time: {selectedPost.readTime}
              </p>
            </div>
            
            <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Article Excerpt</h4>
                <p className="text-xs italic text-muted-foreground bg-background dark:bg-slate-900 p-3 rounded-lg border border-border dark:border-border">
                  {selectedPost.excerpt}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Full Post Body</h4>
                <div className="p-4 bg-muted/10 dark:bg-slate-900/40 border border-border dark:border-border rounded-2xl text-foreground dark:text-slate-350 text-sm leading-relaxed whitespace-pre-wrap min-h-[140px]">
                  {selectedPost.content}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setSelectedPost(null)}
                  className="h-10 bg-[#0A1F44] hover:bg-slate-800 text-white font-bold rounded-xl px-6"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
