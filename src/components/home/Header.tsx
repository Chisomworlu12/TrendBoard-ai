import { Search, TrendingUp } from "lucide-react";
import { Input } from "../ui/input";

interface HeaderProp{
    searchQuery: string,
    setShowAll: (value: boolean) => void,
    setSearchQuery: (value: string) => void

}
const Header =({searchQuery,setShowAll, setSearchQuery}: HeaderProp)=>{
return(
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/5 pb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#22C55E]/10 rounded-lg">
            <TrendingUp className="text-[#22C55E]" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">TrendBoard</h1>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#22C55E] transition-colors" />
          <Input
            type="text"
            placeholder="Search news or topics..."
            className="bg-[#1E293B]/50 border-white/10 rounded-xl pl-10 h-11 focus-visible:ring-[#22C55E] focus-visible:ring-offset-0 transition-all"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAll(false); 
            }}
          />
        </div>
      </div>
)
}

export default Header