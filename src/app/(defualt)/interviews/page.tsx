import { SearchBar } from "@/components/interviews/SearchBar";
import VideoGrid from "@/components/interviews/VideoGrid";

export default function VideoArchivePage() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Voices of Our Legacy: Interviews & Story Archive
            </h1>

            <div className="mb-8 max-w-md mx-auto">
                <SearchBar />
            </div>
            <VideoGrid />
        </main>
    );
}
