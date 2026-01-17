import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { db } from "../firebase"; 
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Clock, Award, BookOpen, ChevronRight } from "lucide-react";

export const HistoryList = ({ user }: { user: User | null }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        // Create a query to get only this user's data, newest first
        const q = query(
          collection(db, "quiz_history"),
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Firebase timestamps need to be converted to JS Dates
          displayDate: doc.data().date?.toDate() || new Date()
        }));
        
        setHistory(data);
      } catch (error) {
        console.error("Firestore Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h2 className="text-3xl font-bold text-white mb-8">Your Quiz History</h2>
      {history.length === 0 ? (
        <div className="bg-slate-800/50 rounded-2xl p-12 text-center border border-slate-700">
          <p className="text-slate-400">No quizzes taken yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl hover:bg-slate-800/60 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl"><BookOpen className="w-6 h-6 text-indigo-400" /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.topic}</h3>
                    <p className="text-sm text-slate-400">
                      {item.displayDate.toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-center">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Award className="w-4 h-4" /> {item.score}/{item.totalQuestions}
                    </div>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Score</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-slate-300 font-medium">
                      <Clock className="w-4 h-4" /> {Math.floor(item.timeSpent / 60)}m {item.timeSpent % 60}s
                    </div>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Time</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};