import Achievement, { AchievementProps } from "./achievement"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription} from "./dialog"
import { Fragment } from "react"

export default function AchievementDialogContent({
  fetchedAchievements
}: {
  fetchedAchievements: AchievementProps[]
}) {
  return (
    <DialogContent className="max-w-[425px] max-h-[725px] flex flex-col p-0">
      <DialogHeader className="px-4 pt-4 pb-2">
        <DialogTitle>Achievements</DialogTitle>
      </DialogHeader>
      <DialogDescription hidden>
        All locked and unlocked achievements for jacobmoy.com.
      </DialogDescription>
      <div className="flex flex-col overflow-y-scroll flex-grow px-6 pb-4">
        {fetchedAchievements.map((props, idx) => 
          <Fragment key={props.info.title}>
            <Achievement
              info={props.info}
              unlocked={props.unlocked}
            />
            {idx != fetchedAchievements.length - 1 &&
            <div className="my-6 dark:bg-zinc-400 bg-zinc-500 w-full min-h-[1px]"/>}
          </Fragment>
        )}
      </div>
    </DialogContent>
  )
}