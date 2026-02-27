import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import type { ChartDataItem } from "../../Trenchboard"

interface SideChartProps{
    chartData: ChartDataItem[]
}
const SideChart=({chartData}: SideChartProps)=>{
    return(
          <aside className="space-y-6">
          <div className="bg-[#1E293B]/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">
              Topic Frequency
            </h4>
            <div className="h-56 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" hide />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#22C55E" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-linear-to-br from-[#22C55E]/20 to-transparent p-6 rounded-2xl border border-[#22C55E]/20">
            <h4 className="text-xs font-bold text-[#22C55E] mb-2 uppercase tracking-widest">
              AI Powered
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Sentiment analysis processed via GPT-4o-mini in real-time.
            </p>
          </div>
        </aside>
    )
}
export default SideChart