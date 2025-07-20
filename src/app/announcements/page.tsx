import AnnouncementList from '@/components/announcements/AnnouncementList'
import { Badge } from '@/components/ui/badge'

export default function AnnouncementsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
          <p className="text-muted-foreground">
            Stay updated with the latest company announcements and important notices
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">3 Active</Badge>
        </div>
      </div>
      
      <div className="max-w-4xl">
        <AnnouncementList />
      </div>
    </div>
  )
}
