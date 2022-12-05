using System.Net.Mail;
using System.Collections.Generic;
using System;

public class Program
{
    public static void Main(string[] args)
    {
        //Part1();
        Part2();
    }

    private static void Part1()
    {
        // Find the highest number of calories an elf is carrying
        int highest = 0;
        int currentTotal = 0;
        using (StreamReader reader = new StreamReader("input.txt"))
        {
            while (!reader.EndOfStream)
            {
                string? line = reader.ReadLine();
                if (string.IsNullOrEmpty(line))
                {
                    if (currentTotal > highest)
                        highest = currentTotal;
                    currentTotal = 0;
                }
                else
                {
                    currentTotal += int.Parse(line);
                }
            }
        }

        Console.WriteLine(highest);
    }

    private static void Part2()
    {
        // Get the top three calorie totals
        List<int> topTotals = new List<int>();
        int numTopTotalsToTrack = 3;
        int currentTotal = 0;
        using (StreamReader reader = new StreamReader("input.txt"))
        {
            while (!reader.EndOfStream)
            {
                string? line = reader.ReadLine();
                if (string.IsNullOrEmpty(line))
                {
                    if (topTotals.Count < numTopTotalsToTrack || currentTotal > topTotals[0])
                    {
                        topTotals.Add(currentTotal);
                        topTotals.Sort();
                        if (topTotals.Count > numTopTotalsToTrack)
                            topTotals.RemoveAt(0);
                    }
                    currentTotal = 0;
                }
                else
                {
                    currentTotal += int.Parse(line);
                }
            }
        }
        int combinedTotals = 0;
        Console.WriteLine("TOP TOTALS:");
        foreach (int total in topTotals)
        {
            Console.WriteLine($"  {total}");
            combinedTotals += total;
        }
        Console.WriteLine($"SUM = {combinedTotals}");
    }
}